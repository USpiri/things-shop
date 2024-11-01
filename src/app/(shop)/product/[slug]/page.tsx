import {
  Button,
  ProductImageSwiper,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { initialData } from "@/seed";
import { ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}
export default function Page({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <main className="flex items-center justify-center h-full">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-20">
        <ProductImageSwiper images={product.images} />
        <div className="sm:col-span-2 flex flex-col justify-between p-3">
          <div className=" flex flex-col gap-6">
            <h1 className="text-3xl font-mono font-semibold">
              {product.title}
            </h1>
            <p className="text-sm opacity-80 font-light">
              {product.description}
            </p>
            <p className="font-mono text-4xl opacity-80">${product.price}</p>
            <div>
              <p className="mb-2">Size:</p>
              <SizeSelector
                value="M"
                options={["S", "M", "L", "XS", "XL", "XXL", "XXXL"]}
              />
            </div>
            <div>
              <p className="mb-2">Quantity:</p>
              <QuantitySelector maxValue={10} />
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <Button
              variant="primary"
              size="lg"
              className="tracking-wider font-medium"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
