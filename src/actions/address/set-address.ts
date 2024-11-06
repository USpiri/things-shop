"use server";

import { prisma } from "@/lib/prisma";
import { Address } from "@/models/address.interface";

export const setAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Unable to create address",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      name: address.name,
      lastname: address.lastname,
      phone: address.phone,
      email: address.email,
      state: address.state,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      return await prisma.userAddress.create({
        data: { ...addressToSave },
      });
    }

    return await prisma.userAddress.update({
      where: { userId },
      data: addressToSave,
    });
  } catch (e) {
    console.log(e);
    throw new Error("Unable to create address");
  }
};
