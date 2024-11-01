"use client";
import { Button } from "@/components/ui/button/Button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface Props {
  quantity?: number;
  maxValue?: number;
}

export const QuantitySelector = ({ quantity = 0, maxValue }: Props) => {
  const [count, setCount] = useState(quantity);

  if (maxValue && quantity > maxValue)
    throw new Error("Quantity must be less than maxValue");

  const onQuantityChange = (value: number) => {
    if (count + value < 1 || (maxValue && count + value > maxValue)) return;
    setCount(count + value);
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="icon" onClick={() => onQuantityChange(-1)}>
        <Minus className="w-4 h-4" />
      </Button>
      <div className="bg-neutral-800 px-3 py-0.5 rounded-md font-mono text-sm">
        {count}
      </div>
      <Button size="icon" onClick={() => onQuantityChange(1)}>
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};
