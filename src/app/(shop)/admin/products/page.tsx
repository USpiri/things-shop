import { getPaginatedProductsWithImages } from "@/actions/products";
import { Button, Pagination, Title } from "@/components";
import { currencyFormat } from "@/utils";
import { PenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    take: 20,
    page,
  });

  if (products.length === 0 || isNaN(page)) redirect("/admin/products");

  return (
    <main>
      <Title>Products</Title>
      <section className="max-w-4xl mx-auto">
        <table className="w-full text-sm text-left text-neutral-400 divide-y divide-neutral-800">
          <thead className="text-sm uppercase font-mono font-light max-md:hidden">
            <tr className="*:px-6 *:py-3">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Sizes</th>
              <th scope="col">Stock</th>
              <th scope="col">Gender</th>
              <th scope="col" className="text-right">
                Price
              </th>
              <th scope="col" className="text-right">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 *:*:max-md:block">
            {products.map((product) => (
              <tr
                key={product.id}
                className="*:px-4 *:py-1 *:md:px-4 *:md:py-4 max-md:grid max-md:grid-cols-2 max-md:py-3"
              >
                <th scope="row" className="row-span-6">
                  <div className="h-full flex items-center justify-end md:justify-center">
                    <Link href={`/product/${product.slug}`}>
                      <Image
                        src={`/images/products/${product.images[0]}`}
                        width={100}
                        height={100}
                        alt={`Product "${product.title}" image`}
                        className="max-md:h-32 max-md:w-32 aspect-square"
                      />
                    </Link>
                  </div>
                </th>
                <td className="font-medium max-sm:mt-2 whitespace-nowrap font-mono text-foreground">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="max-w-60 text-wrap hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td>{product.sizes.join(" - ")}</td>
                <td className="text-right max-md:text-left">
                  {product.inStock}
                </td>
                <td className="md:text-center">{product.gender}</td>
                <td className="text-right max-md:text-left">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-right max-md:text-center">
                  <Button
                    size="icon"
                    className="max-md:w-full"
                    link
                    href={`/admin/product/${product.slug}`}
                  >
                    <PenLine className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
          <Pagination className="mt-10" totalPages={totalPages ?? 0} />
        )}
      </section>
    </main>
  );
}
