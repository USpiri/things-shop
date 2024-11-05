import { Button, SubTitle, Title } from "@/components";
import { CircleDollarSign, ShoppingCart } from "lucide-react";
import { ProductsInCart } from "./ui/ProductsInCart";
import { SummaryCart } from "./ui/SummaryCart";

export default function Page() {
  return (
    <main>
      <Title>Shopping Cart</Title>
      <section className="grid grid-cols-1 md:grid-cols-5 max-w-5xl mx-auto relative">
        <div className="px-3 md:col-span-3">
          <SubTitle className="text-lg font-mono">Cart products</SubTitle>
          <div className="flex flex-col divide-neutral-800 divide-y">
            <ProductsInCart />
          </div>
        </div>
        <div className="col-span-2">
          <article className="px-3 flex flex-col gap-3 sticky top-20">
            <SummaryCart />
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
