"use server";
import { prisma } from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string,
) => {
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!order) {
      return { ok: false, message: `Unable to find order. ID: ${orderId}` };
    }

    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);

    return { ok: false, message: "Unable to update order" };
  }
};
