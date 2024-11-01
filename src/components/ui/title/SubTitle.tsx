import { cn } from "@/utils";
import Link from "next/link";

interface Props {
  href?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

export const SubTitle = ({ children, href, label, className }: Props) => {
  const title = (
    <h2 className={cn("text-2xl", !href && !label && className)}>{children}</h2>
  );

  if (!href && !label) return title;

  return (
    <div className={cn("flex justify-between items-center", className)}>
      {title}
      <Link
        href={href!}
        className="font-mono text-sm opacity-50 hover:opacity-100 transition-opacity"
      >
        {label}
      </Link>
    </div>
  );
};
