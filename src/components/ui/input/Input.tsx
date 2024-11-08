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

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const Textarea = ({
  label,
  labelClassName,
  inputClassName,
  ...props
}: TextAreaProps) => {
  return (
    <label className={props.className}>
      <span className={cn("opacity-80 font-mono text-sm", labelClassName)}>
        {label}
      </span>
      <textarea
        {...props}
        className={cn(
          "block w-full text-sm min-h-36 rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent",
          inputClassName,
        )}
      ></textarea>
    </label>
  );
};

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, labelClassName, inputClassName, ...props }, ref) => {
    return (
      <label className={props.className}>
        <span className={cn("opacity-80 font-mono text-sm", labelClassName)}>
          {label}
        </span>
        <textarea
          ref={ref}
          {...props}
          className={cn(
            "block w-full text-sm min-h-36 rounded py-1.5 placeholder:text-neutral-500 border border-neutral-700 outline-none focus:border-blue-600/50 px-3 bg-transparent",
            inputClassName,
          )}
        ></textarea>
      </label>
    );
  },
);
TextAreaForm.displayName = "TextAreaForm";

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
