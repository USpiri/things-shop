"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Address } from "@/models/address.interface";
import { Size } from "@/models/product.interface";
import { purgueAddress } from "@/utils";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

const shipping = 10;

export const createOrder = async (
  requestedProducts: ProductToOrder[],
  address: Address,
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId)
    return {
      ok: false,
      message: "There is no user session",
    };

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: requestedProducts.map((p) => p.productId),
      },
    },
  });

  const itemsInOrder = requestedProducts.reduce(
    (count, p) => count + p.quantity,
    0,
  );

  const { subTotal, totalWithoutShipping, tax } = requestedProducts.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} does not exists`);
      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.totalWithoutShipping += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, totalWithoutShipping: 0 },
  );
  const total = totalWithoutShipping + shipping;

  // transaction

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      //1. Update stock of products

      const updatedProductPromises = products.map(async (product) => {
        const quantity = requestedProducts
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => (acc += item.quantity), 0);

        if (quantity === 0) {
          throw new Error(`${product.id} does not have a defined quantity`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - quantity,
            inStock: {
              decrement: quantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductPromises);
      updatedProducts.forEach((p) => {
        console.log(p.inStock < 0);

        if (p.inStock < 0) {
          throw new Error(`"${p.title}" out of stock`);
        }
      });

      //2. Create order header and detail

      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          shipping,

          OrderItem: {
            createMany: {
              data: requestedProducts.map(({ quantity, size, productId }) => ({
                quantity,
                size,
                productId,
                price:
                  products.find((prod) => prod.id === productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      //3. Order address

      const { country, ...restAddress } = purgueAddress(address);
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return { order, orderAddress, updatedProducts };
    });

    return {
      ok: true,
      order: prismaTx.order,
      tx: prismaTx,
    };

    // eslint-disable-next-line
  } catch (error) {
    const e = error as Error;
    return {
      ok: false,
      message: e.message,
    };
  }
};
