"use client";

import { Summary } from "@/components";
import { useCartStore } from "@/store/cart/cart.store";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const SummaryCart = () => {
  const _shipping = 10;
  const _tax = 0.15;
  const { subTotal, tax, shipping, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation(_tax, _shipping)),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading</p>;
  }

  return (
    <Summary
      subtotal={subTotal}
      tax={tax}
      taxPercentage={_tax}
      total={total}
      shipping={shipping}
    />
  );
};
