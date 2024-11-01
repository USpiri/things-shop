import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { MenuButton } from "./MenuButton";

export const MenuTopBar = () => {
  return (
    <div className="flex gap-2 items-center">
      <Link href={"/cart"} className="link p-1.5 relative">
        <div className="absolute bg-[#121212] -bottom-1 p-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full border border-neutral-800">
          <span className="font-normal text-xs">3</span>
        </div>
        <ShoppingCart className="w-4 h-4" />
      </Link>

      <Link href={"/search"} className="link p-1.5">
        <Search className="hidden sm:block w-4 h-4" />
      </Link>

      <MenuButton />
    </div>
  );
};
