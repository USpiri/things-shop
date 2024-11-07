"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

interface Options {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({ page = 1, take }: Options) => {
  if (isNaN(Number(page)) || page < 1) page = 1;

  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  const users = await prisma.user.findMany({
    take,
    skip: (page - 1) * (take ?? 0),
    orderBy: {
      name: "desc",
    },
    select: {
      name: true,
      role: true,
      email: true,
      id: true,
    },
  });

  const totalPages = take ? Math.ceil((await prisma.order.count()) / take) : 1;

  return {
    ok: true,
    currentPage: page,
    totalPages,
    users,
  };
};
