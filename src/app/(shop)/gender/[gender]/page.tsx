import { getPaginatedProductsWithImages } from "@/actions/products";
import { Pagination, ProductsGrid, SubTitle, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

const genders: Gender[] = ["men", "women", "kid", "unisex"];

export default async function Page({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  if (!genders.includes(gender as Gender)) notFound();

  const { products, totalPages } = await getPaginatedProductsWithImages({
    take: 6,
    page,
    gender: gender as Gender,
  });

  if (products.length === 0 || isNaN(page)) redirect(`/gender/${gender}`);

  return (
    <main>
      <Title>{gender}</Title>
      <section className="max-w-4xl mx-auto">
        <SubTitle href="/" label="See all" className="mb-6">
          Products
        </SubTitle>
        <ProductsGrid products={products} />
        <Pagination className="mt-10" totalPages={totalPages} />
      </section>
    </main>
  );
}
