"use server";

import { prisma } from "@/lib/prisma";
import { hashSync } from "bcryptjs";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return {
      ok: true,
      user: user,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Unable to create user",
    };
  }
};
