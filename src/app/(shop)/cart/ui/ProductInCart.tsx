import { Button, QuantitySelector } from "@/components";
import { CartProduct } from "@/models/product.interface";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: CartProduct;
  onQuantityChange: (value: number) => void;
  onDeleteProduct: () => void;
}

export const ProductInCart = ({
  product,
  onQuantityChange,
  onDeleteProduct,
}: Props) => {
  return (
    <article className="py-10 flex">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/images/products/${product.image}`}
          width={100}
          height={100}
          alt={`Product: ${product.title}`}
          className="rounded object-cover aspect-square"
        />
      </Link>
      <div className="flex flex-col justify-between flex-1 px-3 py-2 pb-0">
        <header>
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-mono text-lg tracking-wider font-medium">
              {product.size} - {product.title}
            </h3>
          </Link>
          <p className="font-mono tracking-widest text-sm opacity-50">
            {product.size} <span>(${product.price})</span>
          </p>
        </header>
        <QuantitySelector
          quantity={product.quantity}
          onChange={onQuantityChange}
          minValue={1}
        />
      </div>
      <footer className="pt-1 flex flex-col justify-between px-3">
        <Button size="icon" onClick={() => onDeleteProduct()}>
          <Trash2 className="w-4 h-4" />
        </Button>
        <span>${product.price * product.quantity}</span>
      </footer>
    </article>
  );
};
