import { getOrderById } from "@/actions/order/get-by-id";
import {
  ProductSmallItem,
  Shipping,
  SubTitle,
  Summary,
  Title,
} from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;
  const res = await getOrderById(id);

  if (!res.ok) redirect("/orders/");
  const {
    isPaid,
    total,
    subTotal,
    tax,
    shipping,
    OrderAddress: address,
    OrderItem: products,
  } = res.order!;

  return (
    <main>
      <Title>
        <span>Order: {id.split("-")[0]}</span>
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        {!isPaid && (
          <aside className="md:col-span-2 border border-rose-600/30 rounded text-sm bg-red-400/10 px-3 py-1.5">
            Payment pending
          </aside>
        )}
        <section className="flex flex-col gap-6">
          <SubTitle className="text-lg font-mono">Products</SubTitle>
          {products.map((item) => (
            <ProductSmallItem
              key={`${item.size}-${item.product.slug}`}
              product={{
                slug: item.product.slug,
                quantity: item.quantity,
                price: item.product.price,
                size: item.size,
                title: item.product.title,
                image: item.product.images[0].url,
                id: "",
              }}
            />
          ))}
        </section>
        <section className="flex flex-col gap-3">
          <Summary
            total={total}
            subtotal={subTotal}
            tax={tax}
            shipping={shipping}
          />
          <Shipping
            {...address!}
            country={address!.country.name}
            address2={address!.address2 ?? undefined}
            editButton={false}
          />
          <p className="text-sm font-mono mt-3 text-neutral-400">
            <strong>Order ID: </strong>
            {id}
          </p>
        </section>
      </div>
    </main>
  );
}
