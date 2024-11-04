import { Button, Input } from "@/components";
import { Origami } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col max-w-[340px] w-full p-5 gap-5">
        <header>
          <p className="text-center text-sm text-neutral-400">Welcome to</p>
          <div className="flex gap-4 justify-center items-center mt-2">
            <Origami className="stroke-[1.2] w-7 h-7" />
            <h1 className="capitalize font-mono font-light tracking-[.4em] text-3xl">
              Things
            </h1>
          </div>
          <div className="w-full relative flex items-center justify-center">
            <h2 className="text-center px-3 bg-background z-10 text-sm font-mono font-light">
              Shop
            </h2>
            <div className="border-t w-full absolute" />
          </div>
        </header>
        <div className="flex flex-col gap-4">
          <Input label="Full name" placeholder="example@email.com" />
          <Input label="Email" placeholder="example@email.com" />
          <Input label="Password" placeholder="******" />
          <Input label="Confirm Password" placeholder="******" />
          <Button variant="primary" className="text-sm" size="lg">
            Register
          </Button>
        </div>
        <footer className="flex justify-between text-sm sm:flex-row flex-col">
          <p>Alrready have an account?</p>
          <Link href={"/auth/login"} className="font-semibold hover:underline">
            Login
          </Link>
        </footer>
      </div>
    </main>
  );
}
