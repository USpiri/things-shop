"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/models/user.interface";
import { revalidatePath } from "next/cache";

export const updateRole = async (id: string, role: UserRole) => {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    return {
      ok: false,
      message: "Unauthorized",
    };
  }

  try {
    const user = prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    revalidatePath("/admin/users");
    return {
      ok: true,
      user,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Unable to change user role",
    };
  }
};
