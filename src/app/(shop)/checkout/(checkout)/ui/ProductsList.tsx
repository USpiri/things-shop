"use client";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";

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
        <ProductItem
          product={product}
          key={`${product.slug}-${product.size}`}
        />
      ))}
    </>
  );
};
