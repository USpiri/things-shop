import { ProductImage } from "@/components/product/product-image/ProductImage";
import { Product } from "@/models/product.interface";
import { currencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="fade-in group rounded-md overflow-hidden transition-all hover:border-neutral-500"
    >
      <div className="relative">
        <ProductImage
          src={product.images[0]}
          width={300}
          height={300}
          alt={`Product: ${product.title} image`}
          className="w-full"
        />
        {product.images[1] && (
          <ProductImage
            src={product.images[1]}
            width={300}
            height={300}
            alt={`Product: ${product.title} image`}
            className="w-full absolute top-0 left-0 transition-opacity opacity-0 group-hover:opacity-100 duration-300"
          />
        )}
      </div>
      <div className="p-2 text-sm">
        <h3 className="truncate group-hover:opacity-50">{product.title}</h3>
        <p className="font-mono opacity-80">{currencyFormat(product.price)}</p>
      </div>
    </Link>
  );
};
