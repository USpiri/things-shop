"use client";
import { Button } from "@/components/ui/button/Button";
import { Minus, Plus } from "lucide-react";

interface Props {
  quantity?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
}

export const QuantitySelector = ({
  quantity = 1,
  minValue = 0,
  maxValue,
  onChange,
}: Props) => {
  if (maxValue && quantity > maxValue)
    throw new Error("Quantity must be less than maxValue");

  const onQuantityChange = (value: number) => {
    if (
      quantity + value < minValue ||
      (maxValue && quantity + value > maxValue)
    )
      return;
    if (onChange) onChange(quantity + value);
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" onClick={() => onQuantityChange(-1)}>
        <Minus className="w-4 h-4" />
      </Button>
      <div className="bg-neutral-800 px-3 py-0.5 rounded-md font-mono text-sm">
        {quantity}
      </div>
      <Button size="icon" onClick={() => onQuantityChange(1)}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
