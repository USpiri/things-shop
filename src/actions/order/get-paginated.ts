"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface Options {
  page?: number;
  take?: number;
}

export const getAdminOrders = async ({ page = 1, take }: Options) => {
  if (isNaN(Number(page)) || page < 1) page = 1;

  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const orders = await prisma.order.findMany({
    take,
    skip: (page - 1) * (take ?? 0),
    select: {
      id: true,
      total: true,
      isPaid: true,
      itemsInOrder: true,
      OrderAddress: { select: { name: true, lastname: true } },
    },
  });

  const totalPages = take ? Math.ceil((await prisma.order.count()) / take) : 1;

  return {
    ok: true,
    currentPage: page,
    totalPages,
    orders,
  };
};
