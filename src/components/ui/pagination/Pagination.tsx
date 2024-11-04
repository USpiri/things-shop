"use client";

import { cn, generatePagination } from "@/utils";
import { Button } from "../button/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
  className?: string;
}

export const Pagination = ({ className, totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1) ?? 1;
  const pages = generatePagination(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") return `${pathname}?${params.toString()}`;

    if (+pageNumber <= 0) return `${pathname}`;

    if (+pageNumber > totalPages) return `${pathname}?${params.toString()}`;

    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className={cn("flex justify-center", className)}>
      <nav>
        <ul className="flex items-center font-mono font-light text-sm gap-3">
          {currentPage > 1 && (
            <li>
              <Button size="icon" link href={createPageUrl(currentPage - 1)}>
                <ChevronLeft className="w-5 h-5 stroke-[1.2]" />
              </Button>
            </li>
          )}

          {pages.map((page, i) => (
            <li key={`${page}-${i}`}>
              <Button
                link
                href={createPageUrl(page)}
                className={
                  currentPage === page
                    ? "underline underline-offset-4 font-medium"
                    : ""
                }
              >
                {page}
              </Button>
            </li>
          ))}

          {currentPage !== totalPages && (
            <li>
              <Button size="icon" link href={createPageUrl(currentPage + 1)}>
                <ChevronRight className="w-5 h-5 stroke-[1.2]" />
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
