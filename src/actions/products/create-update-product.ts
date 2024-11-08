"use server";

import { prisma } from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const { success, data: product, error } = productSchema.safeParse(data);

  if (!success) {
    return { ok: false, message: "Unable to parse data", error };
  }
  product.slug.toLowerCase().replace(/ /g, "_").trim();

  const { id, ...rest } = product;

  try {
    // Transaction
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: (rest.sizes ?? []) as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: (rest.sizes ?? []) as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }
      return { product };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (e) {
    console.log(e);
    return { ok: false, message: "Unable to save transaction" };
  }
};
