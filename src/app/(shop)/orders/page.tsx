import { Button, Title } from "@/components";
import { ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <main>
      <Title>Orders</Title>
      <section className="max-w-4xl mx-auto">
        <table className="w-full text-sm text-left text-neutral-400 divide-y divide-neutral-800">
          <thead className="text-sm uppercase font-mono font-light max-sm:hidden">
            <tr>
              <th scope="col" className="px-6 py-3">
                # ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Options
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 *:*:max-sm:block">
            <tr className="*:px-5 *:py-1 *:sm:px-6 *:sm:py-4 max-sm:grid max-sm:grid-cols-2">
              <th
                scope="row"
                className="font-medium whitespace-nowrap font-mono text-foreground col-span-2"
              >
                # Apple MacBook Pro 17
              </th>
              <td className="col-span-2">Uriel Spiridione Uriel Spiridione</td>
              <td>
                <div className="flex items-center gap-2 h-full">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                  Delivered
                </div>
              </td>
              <td className="text-right">
                <Button size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
