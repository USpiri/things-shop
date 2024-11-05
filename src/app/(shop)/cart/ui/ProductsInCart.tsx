"use client";

import { useCartStore } from "@/store/cart/cart.store";
import { useEffect, useState } from "react";
import { ProductInCartLoader } from "./ProductInCartLoader";
import { ProductInCart } from "./ProductInCart";

export const ProductsInCart = () => {
  const products = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateProdcutQuantity);
  const deleteProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <>
        {[1, 2].map((i) => (
          <ProductInCartLoader key={i} />
        ))}
      </>
    );
  }

  return (
    <>
      {loaded &&
        products.map((product) => (
          <ProductInCart
            key={`${product.slug}-${product.size}`}
            product={product}
            onDeleteProduct={() => deleteProduct(product)}
            onQuantityChange={(value) => updateQuantity(product, value)}
          />
        ))}
    </>
  );
};
