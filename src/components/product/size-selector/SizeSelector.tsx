"use client";
import { Button } from "@/components/ui/button/Button";
import { Size } from "@/models/product.interface";

interface Props {
  value: Size;
  options: Size[];
  onChange?: (value: Size) => void;
}

export const SizeSelector = ({ value, options, onChange }: Props) => {
  return (
    <div className="text-sm font-mono flex gap-1 flex-wrap">
      {options.map((option) => (
        <Button
          key={option}
          onClick={() => onChange && onChange(option)}
          variant={value === option ? "primary" : "ghost"}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};