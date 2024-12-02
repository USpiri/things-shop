import { Pagination, ProductsGrid, SubTitle, Title } from "@/components";
import { SearchForm } from "./ui/SearchForm";
import { getPaginatedProductsWithImages } from "@/actions/products";
import { Suspense } from "react";

interface Props {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function page({ searchParams }: Props) {
  const query = searchParams?.query || "";
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    take: 6,
    page,
    gender: undefined,
    query,
  });

  return (
    <main>
      <Title>Search</Title>
      <section className="max-w-3xl mx-auto">
        <SearchForm />
      </section>
      <section className="max-w-3xl mx-auto mt-6">
        <SubTitle className="mb-6">Results</SubTitle>
        <Suspense
          key={query + page}
          fallback={<span className="text-neutral-500">Loading</span>}
        >
          <ProductsGrid products={products} />
          {totalPages > 0 && products.length > 0 ? (
            <Pagination className="mt-10" totalPages={totalPages} />
          ) : (
            <span className="text-neutral-500">No results found</span>
          )}
        </Suspense>
      </section>
    </main>
  );
}
