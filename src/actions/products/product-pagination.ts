"use server";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * (take ?? 0),
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender,
      },
    });

    const totalPages = take
      ? Math.ceil((await prisma.product.count({ where: { gender } })) / take)
      : 1;

    return {
      currentPage: page,
      totalPages,
      products: products.map((p) => ({
        ...p,
        images: p.images.map((img) => img.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Can not load products");
  }
};
