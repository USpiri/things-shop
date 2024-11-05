"use client";
import { useCartStore } from "@/store/cart/cart.store";
import { cn } from "@/utils";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CartButton = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link href={"/cart"} className="link p-1.5 relative">
      {loaded && totalItems > 0 && (
        <div
          className={cn(
            "absolute -bottom-1 p-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full border border-neutral-800",
            totalItems <= 20 ? "bg-background" : "bg-blue-600",
          )}
        >
          <span className="font-normal text-xs">
            {totalItems <= 20 ? totalItems : <span>&nbsp;</span>}
          </span>
        </div>
      )}
      <ShoppingCart className="w-4 h-4" />
    </Link>
  );
};
