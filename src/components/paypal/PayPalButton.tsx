"use client";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from "@paypal/paypal-js";
import { setTransactionId } from "@/actions/order";
import { checkPayment } from "@/actions/paypal";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const rounded = Math.round(amount * 100) / 100;

  const createOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions,
  ) => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: `${rounded}`,
          },
          invoice_id: orderId,
        },
      ],
      intent: "CAPTURE",
    });

    // Save transaction id
    const res = await setTransactionId(orderId, transactionId);

    if (!res.ok) {
      throw new Error(res.message);
    }

    return transactionId;
  };

  const onApprove = async (_data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    await checkPayment(details.id!);
  };

  if (isPending) {
    return (
      <div>
        <div className="animate-pulse bg-neutral-700/50 h-11 rounded" />
        <div className="animate-pulse bg-neutral-700/50 h-11 rounded mt-3 mb-10" />
      </div>
    );
  }

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  );
};
