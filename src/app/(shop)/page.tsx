import { ProductsGrid } from "@/components";
import { initialData } from "@/seed";

export default function ShopPage() {
  return (
    <main>
      <h1 className="text-center font-mono font-light tracking-[0.5em] text-3xl mt-10 mb-24">
        Things Shop
      </h1>
      <ProductsGrid products={initialData.products} />
    </main>
  );
}
