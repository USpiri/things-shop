import { Button } from "@/components";
import { initialData } from "@/seed";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
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
        <div className="sm:col-span-3 flex gap-3 flex-col-reverse lg:flex-row justify-end">
          <div className="flex shrink-0 gap-4 flex-row lg:flex-col justify-center lg:justify-start">
            {product.images.map((img) => (
              <Image
                key={img}
                src={`/images/products/${img}`}
                width={200}
                height={200}
                alt={`Product image: ${img}`}
                className="aspect-[4/3] w-40 object-cover rounded object-left-top"
              />
            ))}
          </div>
          <div>
            <Image
              src={`/images/products/${product.images[0]}`}
              width={420}
              height={420}
              alt="Product image"
              className="rounded lg:max-w-[unset] max-w-xl w-full"
            />
          </div>
        </div>
        <div className="sm:col-span-2 flex flex-col justify-between p-3">
          <div className=" flex flex-col gap-6">
            <h1 className="text-3xl font-mono font-semibold">
              {product.title}
            </h1>
            <p className="text-sm opacity-80 font-light">
              {product.description}
            </p>
            <p className="font-mono text-4xl opacity-80">${product.price}</p>
          </div>
          <div className="flex flex-col gap-3">
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
