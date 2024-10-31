import { Origami } from "lucide-react";
import Link from "next/link";

export const TitleTopBar = () => {
  return (
    <Link href={"/"} className="flex items-center flex-row group">
      <Origami className="mr-1.5 w-5 h-5 stroke-[1.2] group-hover:stroke-2 transition-all" />
      Things
    </Link>
  );
};
