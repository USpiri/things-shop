"use client";
import { Button } from "@/components";
import { Address } from "@/models/address.interface";
import { useAddressStore, useCartStore } from "@/store";
import { Check, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export const CreateOrderButton = () => {
  const [loaded, setLoaded] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onCreateOrder = async () => {
    setIsCreatingOrder(true);
    delete address["rememberAddress" as keyof Address];

    const products = cart.map((p) => ({
      productId: p.id,
      quantity: p.quantity,
      size: p.size,
    }));

    console.log(address, products);

    setIsCreatingOrder(false);
  };

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        className="font-semibold mt-2 w-full"
        onClick={onCreateOrder}
        disabled={!loaded && !isCreatingOrder}
      >
        Confirm order
      </Button>
      <p className="text-sm text-red-500 fade-in">
        <TriangleAlert className="w-4 h-4 inline" /> Error creating order
      </p>
      <p className="text-sm text-emerald-500 fade-in">
        <Check className="w-4 h-4 inline" /> Success
      </p>
    </>
  );
};
