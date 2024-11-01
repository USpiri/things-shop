import Link from "next/link";
import { Fragment } from "react";

const categories = [
  { label: "Men", path: "/category/men" },
  { label: "Women", path: "/category/women" },
  { label: "Kids", path: "/category/kid" },
];

// TODO: apply "font-bold" to active item

export const CategoryTopBar = () => {
  return (
    <div className="text-sm hidden sm:block">
      {categories.map((cat, i) => (
        <Fragment key={cat.path}>
          <Link href={cat.path} className="px-2 hover:font-medium">
            {cat.label}
          </Link>
          {categories.length !== i + 1 && <span>-</span>}
        </Fragment>
      ))}
    </div>
  );
};
