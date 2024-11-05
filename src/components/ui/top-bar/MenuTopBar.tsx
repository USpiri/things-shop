import { Search } from "lucide-react";
import Link from "next/link";
import { MenuButton } from "./MenuButton";
import { CartButton } from "./CartButton";

export const MenuTopBar = () => {
  return (
    <div className="flex gap-2 items-center">
      <CartButton />

      <Link href={"/search"} className="link p-1.5">
        <Search className="hidden sm:block w-4 h-4" />
      </Link>

      <MenuButton />
    </div>
  );
};
