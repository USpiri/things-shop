import { cn } from "@/utils";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const Input = ({
  label,
  labelClassName,
  inputClassName,
  ...props
}: InputProps) => {
  return (
    <label className={props.className}>
      <span className={cn("opacity-80 font-mono text-sm", labelClassName)}>
        {label}
      </span>
      <input
        {...props}
        className={cn(
          "block w-full rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent",
          inputClassName,
        )}
      />
    </label>
  );
};

export const InputForm = forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelClassName, inputClassName, ...props }, ref) => {
    return (
      <label className={props.className}>
        <span className={cn("opacity-80 font-mono text-sm", labelClassName)}>
          {label}
        </span>
        <input
          ref={ref}
          {...props}
          className={cn(
            "block w-full rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent",
            inputClassName,
          )}
        />
      </label>
    );
  },
);
InputForm.displayName = "InputForm";
