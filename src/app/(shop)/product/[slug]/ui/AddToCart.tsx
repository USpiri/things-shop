"use client";
import { Button, QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/models/product.interface";
import { cn } from "@/utils";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [clicked, setClicked] = useState(false);

  const addToCart = () => {
    if (!size) {
      setClicked(true);
      return;
    }

    console.log({ size, quantity, product });
  };

  return (
    <div className="flex-1 flex justify-between flex-col gap-6">
      <div className="space-y-6">
        <div>
          <p className="mb-2">Size:</p>
          <SizeSelector
            value={size}
            onChange={(value) => {
              setClicked(false);
              setSize(value);
            }}
            options={["S", "M", "L", "XS", "XL", "XXL", "XXXL"]}
          />
        </div>
        <div>
          <p className="mb-2">Quantity:</p>
          <QuantitySelector
            maxValue={10}
            quantity={quantity}
            onChange={setQuantity}
          />
        </div>
      </div>
      <div>
        <p
          className={cn(
            "opacity-50 text-sm",
            clicked ? "visible" : "invisible",
          )}
        >
          Please select a size
        </p>
        <Button
          variant="primary"
          size="lg"
          onClick={() => addToCart()}
          className="w-full tracking-wider font-medium"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </Button>
      </div>
    </div>
  );
};
