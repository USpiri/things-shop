"use client";
import { CartProduct } from "@/models/product.interface";
import { currencyFormat } from "@/utils";
import Image from "next/image";

interface Props {
  product: CartProduct;
}

export const ProductItem = ({ product }: Props) => {
  return (
    <article className="flex">
      <Image
        src={`/images/products/${product.image}`}
        width={50}
        height={50}
        alt={`Product: ${product.title}`}
        className="rounded object-cover aspect-square shrink-0"
      />
      <div className="flex flex-col justify-between flex-1 px-3 pb-0 overflow-hidden">
        <header>
          <h3 className="font-mono text-lg tracking-wider truncate">
            {product.title}
          </h3>
          <p className="font-mono tracking-widest text-sm opacity-50">
            {product.size}
            <span> ({currencyFormat(product.price)})</span>
            <span> x{product.quantity}</span>
          </p>
        </header>
      </div>
      <footer className="pt-1 flex flex-col justify-between px-3">
        <span>{currencyFormat(product.quantity * product.price)}</span>
      </footer>
    </article>
  );
};
