import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user) redirect("/");

  return (
    <main>
      <Title>Profile</Title>
      <pre className="font-mono text-sm max-w-xl w-full mx-auto bg-neutral-900 px-3 py-1.5 rounded">
        {JSON.stringify(session.user, null, 2)}
      </pre>
    </main>
  );
}
