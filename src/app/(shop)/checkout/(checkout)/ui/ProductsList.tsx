"use client";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { useCartStore } from "@/store";

export const ProductsList = () => {
  const products = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
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
