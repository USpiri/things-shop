import { Product } from "@/models/product.interface";
import { ProductGridItem } from "./ProductGridItem";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
      {products.map((product) => (
        <ProductGridItem product={product} key={product.slug} />
      ))}
    </div>
  );
};
