import { cn } from "@/utils";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={cn(
        "capitalize text-center font-mono font-light tracking-[0.5em] text-3xl mt-14 mb-24",
        className,
      )}
    >
      {children}
    </h1>
  );
};
