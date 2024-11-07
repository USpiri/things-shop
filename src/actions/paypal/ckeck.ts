"use server";

import { prisma } from "@/lib/prisma";
import { PayPalOrderStatusResponse } from "@/models/paypal.interface";
import { revalidatePath } from "next/cache";

export const checkPayment = async (id: string) => {
  const authToken = await getBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "Unable to validate Paypal Token",
    };
  }

  const resp = await verifyPayment(id, authToken);
  if (!resp) {
    return {
      ok: false,
      message: "Error validating payment",
    };
  }

  const { status, purchase_units } = resp;
  const { invoice_id: orderId } = purchase_units[0];
  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Uncompleted payment",
    };
  }

  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });
    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (e) {
    console.log(e);
    return {
      ok: false,
      message: "Unable to complete payment",
    };
  }
};

const getBearerToken = async () => {
  const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_ID}:${PAYPAL_SECRET}`,
    "utf-8",
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayment = async (
  paypalId: string,
  bearerToken: string,
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalId}`;

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
