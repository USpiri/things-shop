import { SubTitle, SummaryCart, Title } from "@/components";
import { ProductsList } from "./ui/ProductsList";
import { ShippingInformation } from "./ui/ShippingInformation";
import { CreateOrderButton } from "./ui/CreateOrderButton";

export default function Page() {
  return (
    <main>
      <Title>Checkout</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <section className="flex flex-col gap-6">
          <SubTitle className="text-lg font-mono">Products</SubTitle>
          <ProductsList />
        </section>
        <section className="flex flex-col gap-3">
          <SummaryCart />
          <ShippingInformation />
          <p className="text-xs font-mono mt-3 text-neutral-400">
            By submitting this page you agree to our{" "}
            <strong>terms and conditions</strong> and our{" "}
            <strong>privacy policy</strong>.
          </p>
          <CreateOrderButton />
        </section>
      </div>
    </main>
  );
}
