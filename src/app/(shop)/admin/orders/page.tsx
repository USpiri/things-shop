import { getAdminOrders } from "@/actions/order";
import { Button, Pagination, Title } from "@/components";
import { cn, currencyFormat } from "@/utils";
import { ExternalLink } from "lucide-react";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const {
    orders = [],
    totalPages = 1,
    ok,
  } = await getAdminOrders({
    take: 5,
    page,
  });
  if (!ok) redirect("/");

  if ((orders.length === 0 && page > 1) || isNaN(page))
    redirect(`/admin/orders`);

  return (
    <main>
      <Title>Orders</Title>
      <section className="max-w-4xl mx-auto">
        <table className="w-full text-sm text-left text-neutral-400 divide-y divide-neutral-800">
          <thead className="text-sm uppercase font-mono font-light max-sm:hidden">
            <tr className="*:px-6 *:py-3">
              <th scope="col"># ID</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-right">
                Total
              </th>
              <th scope="col" className="text-right">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 *:*:max-sm:block">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="*:px-5 *:py-1 *:sm:px-6 *:sm:py-4 max-sm:grid max-sm:grid-cols-2"
              >
                <th
                  scope="row"
                  className="font-medium max-sm:mt-2 whitespace-nowrap font-mono text-foreground col-span-2"
                >
                  # {order.id.split("-")[0]}
                </th>
                <td className="col-span-2">
                  {order.OrderAddress?.name} {order.OrderAddress?.lastname}
                </td>
                <td>
                  <div className="flex items-center gap-2 h-full">
                    <div
                      className={cn(
                        "w-1 h-1 rounded-full",
                        order.isPaid ? "bg-emerald-500" : "bg-red-500",
                      )}
                    />
                    {order.isPaid ? "Paid" : "Pending payment"}
                  </div>
                </td>
                <td className="text-right max-sm:text-left">
                  {currencyFormat(order.total)} ({order.itemsInOrder})
                </td>
                <td className="text-right max-sm:col-span-2 max-sm:text-center">
                  <Button
                    size="icon"
                    className="max-sm:w-full"
                    link
                    href={`/orders/${order.id}`}
                  >
                    <ExternalLink className="w-4 h-4" />
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
