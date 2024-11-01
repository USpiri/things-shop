import { ProductsGrid, SubTitle, Title } from "@/components";
import { Gender } from "@/models/product.interface";
import { initialData } from "@/seed";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: Gender;
  };
}

const genders: Gender[] = ["men", "women", "kid"];

export default function Page({ params }: Props) {
  const { id } = params;

  const products = initialData.products.filter((p) => p.gender === id);

  if (id === "unisex") redirect("/");
  if (!genders.includes(id)) notFound();

  return (
    <main>
      <Title>{id}</Title>
      <section className="max-w-4xl mx-auto">
        <SubTitle href="/" label="See all" className="mb-6">
          Products
        </SubTitle>
        <ProductsGrid products={products} />
      </section>
    </main>
  );
}
