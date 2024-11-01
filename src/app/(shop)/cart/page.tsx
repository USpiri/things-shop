import { Button, QuantitySelector, SubTitle, Title } from "@/components";
import { initialData } from "@/seed";
import { CircleDollarSign, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Title>Shopping Cart</Title>
      <section className="grid grid-cols-1 md:grid-cols-5 max-w-5xl mx-auto relative">
        <div className="px-3 md:col-span-3">
          <SubTitle className="text-lg font-mono">Cart products</SubTitle>
          <div className="flex flex-col divide-neutral-800 divide-y">
            {initialData.products.slice(5, 13).map((product) => (
              <article key={product.slug} className="py-10 flex">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={`/images/products/${product.images[0]}`}
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
                        {product.title}
                      </h3>
                    </Link>
                    <p className="font-mono tracking-widest text-sm opacity-50">
                      SM <span>($50)</span>
                    </p>
                  </header>
                  <QuantitySelector />
                </div>
                <footer className="pt-1 flex flex-col justify-between px-3">
                  <Button size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <span>$100</span>
                </footer>
              </article>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <article className="px-3 flex flex-col gap-3 sticky top-20">
            <SubTitle className="text-lg font-mono">Order Summary</SubTitle>
            <dl className="divide-y divide-neutral-800 text-sm *:flex *:justify-between *:py-4 font-mono">
              <div className="opacity-70">
                <dt>Subtotal</dt>
                <dd>$500</dd>
              </div>
              <div className="opacity-70">
                <dt>Tax</dt>
                <dd>$0</dd>
              </div>
              <div className="opacity-70">
                <dt>Shipping</dt>
                <dd>$10</dd>
              </div>
              <div className="font-bold text-lg">
                <dt>Total</dt>
                <dd>$510</dd>
              </div>
            </dl>
            <div className="flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                className="font-semibold"
                link
                href="/checkout/address"
              >
                <CircleDollarSign className="w-5 h-5" />
                Checkout
              </Button>
              <Button variant="outline" size="lg" link href="/">
                <ShoppingCart className="w-5 h-5" />
                Continue shopping
              </Button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
