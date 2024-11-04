import { getPaginatedProductsWithImages } from "@/actions/products";
import { Pagination, ProductsGrid, SubTitle, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    take: 3,
    page,
  });

  if (products.length === 0 || isNaN(page)) redirect("/");

  return (
    <main>
      <Title>Things Shop</Title>
      <section className="max-w-4xl mx-auto">
        <SubTitle className="mb-6">Products</SubTitle>
        <ProductsGrid products={products} />
        <Pagination className="mt-10" totalPages={totalPages} />
      </section>
    </main>
  );
}
