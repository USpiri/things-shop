import { getCountries } from "@/actions/country";
import { Button, SummaryCart, Title } from "@/components";
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
          <SummaryCart />
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
