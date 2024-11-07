"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getOrders = async () => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      total: true,
      isPaid: true,
      itemsInOrder: true,
      OrderAddress: { select: { name: true, lastname: true } },
    },
  });

  return {
    ok: true,
    orders,
  };
};
