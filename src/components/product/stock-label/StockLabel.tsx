"use client";

import { getProductStockBySlug } from "@/actions/products/product-stock-by";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock(slug);
  }, [slug]);

  const getStock = async (slug: string) => {
    const stock = await getProductStockBySlug(slug);
    setStock(stock ?? 0);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <span className="bg-foreground rounded animate-pulse">
          &nbsp;&nbsp;&nbsp;
        </span>
      ) : (
        <span>{stock}</span>
      )}
    </>
  );
};
