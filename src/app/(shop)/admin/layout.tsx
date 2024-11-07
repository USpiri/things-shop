import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const session = await auth();
  const url = new URL(headersList.get("x-url") || "");

  if (!session?.user) redirect(`/auth/login?redirectTo=${url.pathname}`);
  if (session.user.role !== "admin") redirect("/");
  return <>{children}</>;
}
