"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";
import { ProductSmallItem } from "@/components";

export const ProductsList = () => {
  const products = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoaded(true);
    if (useCartStore.getState().cart.length === 0) router.replace("/");
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductSmallItem
          product={product}
          key={`${product.slug}-${product.size}`}
        />
      ))}
    </>
  );
};
