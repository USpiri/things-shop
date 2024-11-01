import { Button, Input, SubTitle, Title } from "@/components";

export default function Page() {
  return (
    <main>
      <Title>Checkout</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <section className="flex flex-col gap-5">
          <div>
            <SubTitle className="text-lg font-mono mb-3">
              Contact Information
            </SubTitle>
            <Input label="Email address" placeholder="email@example.com" />
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
            <SubTitle className="text-lg font-mono sm:col-span-2">
              Shipping information
            </SubTitle>
            <Input label="Email address" placeholder="email@example.com" />
            <Input label="Email address" placeholder="email@example.com" />
            <Input
              label="Email address"
              placeholder="email@example.com"
              className="sm:col-span-2"
            />
            <Input
              label="Email address"
              placeholder="email@example.com"
              className="sm:col-span-2"
            />
            <Input label="Email address" placeholder="email@example.com" />
            <Input label="Email address" placeholder="email@example.com" />
            <Input label="Email address" placeholder="email@example.com" />
            <Input label="Email address" placeholder="email@example.com" />
          </div>
        </section>
        <section className="">
          <SubTitle className="text-lg font-mono sm:col-span-2 mb-3">
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
          <Button
            variant="primary"
            size="lg"
            className="font-semibold mt-6 w-full"
            link
            href="/checkout"
          >
            Confirm payment
          </Button>
        </section>
      </div>
    </main>
  );
}
