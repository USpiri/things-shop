import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
export default function Page({ params }: Props) {
  const { id } = params;

  if (!["men", "women", "kids"].includes(id)) {
    notFound();
  }

  return <main>Hello Category: {id}</main>;
}
