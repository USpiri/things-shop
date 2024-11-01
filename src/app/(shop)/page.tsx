import { ProductsGrid, SubTitle, Title } from "@/components";
import { initialData } from "@/seed";

export default function ShopPage() {
  return (
    <main>
      <Title>Things Shop</Title>
      <section className="max-w-4xl mx-auto">
        <SubTitle className="mb-6">Products</SubTitle>
        <ProductsGrid products={initialData.products} />
      </section>
    </main>
  );
}
