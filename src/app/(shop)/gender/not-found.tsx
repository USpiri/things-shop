import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      <div className="group">
        <h1 className="font-mono text-5xl font-light">
          404!
          <span className="text-3xl group-hover:animate-pulse">Ups</span>
        </h1>
        <p className="opacity-50">This is not the page you are looking for</p>
        <Link href={"/"} className="mt-2 flex">
          <div>
            Go back
            <div className="w-[0%] border-t-2 group-hover:w-full transition-all border-neutral-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}
