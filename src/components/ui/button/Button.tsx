import { cn } from "@/utils";
import Link from "next/link";

type Style = "ghost" | "outline" | "primary";
type Size = "default" | "icon" | "lg";

const style: Record<Style, string> = {
  ghost: "hover:bg-neutral-800/80",
  outline: "border border-neutral-700 hover:bg-neutral-800/50",
  primary: "bg-[var(--foreground)] text-[var(--background)]",
};

const btnSize: Record<Size, string> = {
  icon: "p-1.5",
  default: "px-2 py-1",
  lg: "px-4 py-2",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Style;
  size?: Size;
  link?: boolean;
  href?: string;
}

export const Button = ({
  children,
  className,
  size = "default",
  variant = "ghost",
  link,
  href,
  ...props
}: ButtonProps) => {
  const commonClasses = cn(
    "rounded active:scale-95 transition-all inline-flex items-center justify-center gap-2",
    "disabled:pointer-events-none disabled:opacity-50",
    btnSize[size],
    style[variant],
    className,
  );

  if (link && href)
    return (
      <Link href={href} className={commonClasses}>
        {children}
      </Link>
    );

  return (
    <button {...props} className={commonClasses}>
      {children}
    </button>
  );
};
