import { TobBar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TobBar />
      <div className="max-w-6xl w-full mx-auto p-4">{children}</div>
    </div>
  );
}
