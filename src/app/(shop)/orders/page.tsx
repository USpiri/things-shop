import { Button, Title } from "@/components";
import { ExternalLink } from "lucide-react";

export default function Page() {
  return (
    <main>
      <Title>Orders</Title>
      <section className="max-w-4xl mx-auto">
        <table className="w-full text-sm text-left text-neutral-400 divide-y divide-neutral-800">
          <thead className="text-sm uppercase font-mono font-light">
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
          <tbody className="divide-y divide-neutral-800">
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap font-mono text-foreground"
              >
                # Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">Uriel Spiridione</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                  Delivered
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <Button size="icon">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4 flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                Delivered
              </td>
              <td className="px-6 py-4">$1200</td>
            </tr>
            <tr>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
