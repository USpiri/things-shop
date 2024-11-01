import { Footer, Sidebar, TopBar } from "@/components";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr] min-h-dvh">
      <TopBar />
      <div className="max-w-6xl w-full mx-auto p-4">{children}</div>
      <Footer />
      <Sidebar />
    </div>
  );
}
