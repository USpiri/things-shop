import { getProductWithImagesBySlug } from "@/actions/products/product-by";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";
import { getCategories } from "@/actions/category";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;

  const [product, categories] = await Promise.all([
    getProductWithImagesBySlug(slug),
    getCategories(),
  ]);

  if (!product && slug !== "new") redirect("/admin/products");
  const title = slug === "new" ? "New product" : "Edit Product";

  return (
    <main>
      <Title>
        {title}
        <br />
        <span className="text-base tracking-wide break-all">{slug}</span>
      </Title>
      <ProductForm product={product ?? {}} categories={categories} />
    </main>
  );
}
