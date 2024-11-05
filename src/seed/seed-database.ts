import { prisma } from "../lib/prisma";
import { initialData } from ".";
import { countries } from "./seed-country";

async function main() {
  if (process.env.NODE_ENV === "production") return;

  // 1. Delete previous data
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.country.deleteMany();

  const { products, categories, users } = initialData;

  await prisma.user.createMany({ data: users });
  await prisma.country.createMany({ data: countries });

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map, cat) => {
      map[cat.name.toLowerCase()] = cat.id;
      return map;
    },
    {} as Record<string, string>,
  );

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: [...imagesData],
    });
  });

  console.log("Seed Executed");
}

(() => {
  main();
})();
