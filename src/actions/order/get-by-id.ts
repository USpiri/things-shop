"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: {
          include: { country: { select: { name: true } } },
        },
        OrderItem: {
          select: {
            quantity: true,
            price: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                price: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw new Error("Order not found");
    if (session.user.role === "user" && session.user.id !== order.userId) {
      throw new Error("Unauthorized");
    }

    return { ok: true, order };
  } catch (e) {
    const error = e as Error;
    return { ok: false, message: error.message };
  }
};
