"use client";
import { createOrder } from "@/actions/order";
import { Button } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export const CreateOrderButton = () => {
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState<string | undefined>();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onCreateOrder = async () => {
    setIsCreatingOrder(true);

    const products = cart.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
      size: p.size,
    }));

    const res = await createOrder(products, address);

    if (!res.ok) {
      setIsCreatingOrder(false);
      setMessage(res.message ?? "");
      return;
    }

    setMessage("");
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        className="font-semibold mt-2 w-full"
        onClick={() => onCreateOrder()}
        disabled={!loaded && !isCreatingOrder}
      >
        Confirm order
      </Button>
      {message !== undefined && (
        <>
          {message.length === 0 ? (
            <p className="text-sm text-emerald-500 fade-in">
              <Check className="w-4 h-4 inline" /> Success
            </p>
          ) : (
            <p className="text-sm text-red-500 fade-in">
              <TriangleAlert className="w-4 h-4 inline" /> Error creating order:{" "}
              {message}
            </p>
          )}
        </>
      )}
    </>
  );
};
