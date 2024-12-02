"use client";
import { Search } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export const SearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("query", search);
    } else {
      params.delete("query");
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form className="flex items-center gap-3">
      <label className="border border-neutral-700 flex flex-1 items-center gap-3 rounded py-1.5 px-3">
        <Search className="w-4 h-4" />
        <input
          className="placeholder:text-neutral-500 outline-none focus:border-blue-600/50 bg-transparent"
          placeholder="Search products"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </label>
    </form>
  );
};
