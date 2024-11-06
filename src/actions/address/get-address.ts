"use server";

import { prisma } from "@/lib/prisma";

export const getAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });

    if (!address) return null;
    const { countryId, ...rest } = address;

    return {
      ...rest,
      country: countryId,
      address2: address.address2 ?? undefined,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
};
