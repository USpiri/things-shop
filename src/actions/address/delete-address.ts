"use server";

import { prisma } from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {
  try {
    await prisma.userAddress.delete({ where: { userId } });
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Unable to remove address",
    };
  }
};
