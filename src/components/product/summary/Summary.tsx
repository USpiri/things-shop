import { SubTitle } from "@/components/ui/title/SubTitle";

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxPercentage?: number;
  total: number;
}

export const Summary = ({
  subtotal,
  shipping,
  tax,
  taxPercentage,
  total,
}: Props) => {
  return (
    <>
      <SubTitle className="text-lg font-mono">Order Summary</SubTitle>
      <dl className="divide-y divide-neutral-800 text-sm *:flex *:justify-between *:py-4 font-mono">
        <div className="opacity-70">
          <dt>Subtotal</dt>
          <dd>${subtotal}</dd>
        </div>
        <div className="opacity-70">
          <dt>Tax{taxPercentage && <span> ({taxPercentage}%)</span>}</dt>
          <dd>${tax}</dd>
        </div>
        <div className="opacity-70">
          <dt>Shipping</dt>
          <dd>${shipping}</dd>
        </div>
        <div className="font-bold text-lg">
          <dt>Total</dt>
          <dd>${total}</dd>
        </div>
      </dl>
    </>
  );
};
