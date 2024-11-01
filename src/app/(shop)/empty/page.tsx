import { Button, Title } from "@/components";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <Title>Shopping Cart</Title>
      <section className="flex items-center justify-center flex-col gap-5">
        <Image
          src={"/images/waiting.png"}
          width={100}
          height={200}
          alt="Waiting man"
        />
        <p className="text-center text-neutral-400">Your cart is empty</p>
        <Button
          link
          href="/"
          variant="primary"
          className="font-semibold text-sm"
        >
          Go Back
        </Button>
      </section>
    </main>
  );
}
