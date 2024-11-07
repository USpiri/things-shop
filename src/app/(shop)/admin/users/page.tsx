import { Pagination, Title } from "@/components";
import { redirect } from "next/navigation";
import { UserRoleSelector } from "./ui/UserRoleSelector";
import { getPaginatedUsers } from "@/actions/user";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { users = [], totalPages = 1 } = await getPaginatedUsers({
    take: 5,
    page,
  });

  if (users.length === 0 || isNaN(page)) redirect(`/admin/users`);

  return (
    <main>
      <Title>Users</Title>
      <section className="max-w-4xl mx-auto">
        <table className="w-full text-sm text-left text-neutral-400 divide-y divide-neutral-800">
          <thead className="text-sm uppercase font-mono font-light max-sm:hidden">
            <tr className="*:px-6 *:py-3">
              <th scope="col"># ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col" className="text-right">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800 *:*:max-sm:block">
            {users.map((user) => (
              <tr
                key={user.id}
                className="*:px-5 *:py-1 *:sm:px-6 *:sm:py-4 max-sm:grid max-sm:grid-cols-2"
              >
                <th
                  scope="row"
                  className="font-medium max-sm:mt-2 whitespace-nowrap font-mono text-foreground col-span-2"
                >
                  # {user.id.split("-")[0]}
                </th>
                <td className="col-span-2">{user.name}</td>
                <td>{user.email}</td>
                <td className="text-right max-sm:col-span-2 max-sm:mb-3 max-sm:text-center">
                  <UserRoleSelector userId={user.id} value={user.role} />
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
