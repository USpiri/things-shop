export const revalidate = 604800;

import { getProductBySlug } from "@/actions/products/product-by";
import { ProductImageSwiper, StockLabel } from "@/components";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? "Thins Shop",
    description: product?.description ?? "Minimalist shop",
    openGraph: {
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="flex items-center justify-center h-full">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:gap-5">
        <ProductImageSwiper images={product.images} />
        <div className="sm:col-span-2 flex flex-col justify-between p-3 gap-6">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-mono font-semibold">
              {product.title}
            </h1>
            <p className="text-sm opacity-80 font-light">
              {product.description} &nbsp;
            </p>
            <div>
              <p className="font-mono text-4xl opacity-80">${product.price}</p>
              <span className="text-sm opacity-50">
                In stock: <StockLabel slug={slug} />
              </span>
            </div>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </main>
  );
}
