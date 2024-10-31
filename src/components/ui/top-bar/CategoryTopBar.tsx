import Link from "next/link";

const categories = [
  { label: "Hombre", path: "/category/men" },
  { label: "Mujer", path: "/category/women" },
  { label: "Niños", path: "/category/kids" },
];

// TODO: apply "font-bold" to active item

export const CategoryTopBar = () => {
  return (
    <div className="text-sm hidden sm:block">
      {categories.map((cat, i) => (
        <>
          <Link
            href={cat.path}
            key={cat.label}
            className="px-2 hover:font-medium"
          >
            {cat.label}
          </Link>
          {categories.length !== i + 1 && <span>-</span>}
        </>
      ))}
    </div>
  );
};
