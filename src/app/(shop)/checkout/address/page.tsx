import { getCountries } from "@/actions/country";
import { Button, SubTitle, Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getAddress } from "@/actions/address";
import { auth } from "@/auth";

export default async function Page() {
  const countries = await getCountries();
  const session = await auth();
  const address = (await getAddress(session!.user.id)) ?? undefined;

  return (
    <main>
      <Title>Checkout</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <section>
          <AddressForm countries={countries} storedAddress={address} />
        </section>
        <section>
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
            form="address-form"
            type="submit"
          >
            Confirm payment
          </Button>
        </section>
      </div>
    </main>
  );
}
