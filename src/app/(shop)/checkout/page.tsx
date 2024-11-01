import { Button, SubTitle, Title } from "@/components";
import { initialData } from "@/seed";
import { PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Title>Checkout</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <section className="flex flex-col gap-5">
          <div>
            <SubTitle className="text-lg font-mono mb-3">Products</SubTitle>
            <div className="flex flex-col gap-3 mb-6">
              {initialData.products.slice(5, 13).map((product) => (
                <article key={product.slug} className="flex">
                  <Link href={`/product/${product.slug}`} className="shrink-0">
                    <Image
                      src={`/images/products/${product.images[0]}`}
                      width={50}
                      height={50}
                      alt={`Product: ${product.title}`}
                      className="rounded object-cover aspect-square"
                    />
                  </Link>
                  <div className="flex flex-col justify-between flex-1 px-3 pb-0 overflow-hidden">
                    <header>
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-mono text-lg tracking-wider truncate">
                          {product.title}
                        </h3>
                      </Link>
                      <p className="font-mono tracking-widest text-sm opacity-50">
                        SM
                        <span> ($50)</span>
                        <span> x2</span>
                      </p>
                    </header>
                  </div>
                  <footer className="pt-1 flex flex-col justify-between px-3">
                    <span>$100</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-3">
          <SubTitle className="text-lg font-mono sm:col-span-2">
            Order summary
          </SubTitle>
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
          <SubTitle className="text-lg font-mono">
            Shipping Information
          </SubTitle>
          <div className="text-sm text-neutral-400 font-mono grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 relative">
            <p>Uriel Spiridione</p>
            <p>email@example.com</p>
            <p>+54 1234567890</p>
            <p>Some street 123</p>
            <p>Alternative: Some other 456</p>
            <p>Argentina, Córdoba, Córdoba, X5000</p>
            <Button
              className="mb-3 max-md:w-full max-md:mt-3 sm:col-span-2 md:absolute top-0 right-0"
              variant="ghost"
              link
              href="/checkout/address"
            >
              <PenLine className="w-4 h-4" />
              Edit
            </Button>
          </div>
          <p className="text-xs font-mono mt-6 text-neutral-400">
            By submitting this page you agree to our{" "}
            <strong>terms and conditions</strong> and our{" "}
            <strong>privacy policy</strong>.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="font-semibold mt-2 w-full"
            link
            href="/orders/123"
          >
            Confirm payment
          </Button>
          <Button variant="outline" link href="/cart">
            Edit cart
          </Button>
        </section>
      </div>
    </main>
  );
}
