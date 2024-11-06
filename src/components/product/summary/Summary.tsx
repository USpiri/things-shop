import { SubTitle } from "@/components/ui/title/SubTitle";
import { currencyFormat } from "@/utils";

interface Props {
  subtotal: number;
  shipping: number;
  tax: number;
  taxPercentage?: number;
  total: number;
  loading?: boolean;
}

export const Summary = ({
  subtotal,
  shipping,
  tax,
  taxPercentage,
  total,
  loading = false,
}: Props) => {
  return (
    <>
      <SubTitle className="text-lg font-mono">Order Summary</SubTitle>
      <dl className="divide-y divide-neutral-800 text-sm *:flex *:justify-between *:py-4 font-mono">
        <div className="opacity-70">
          <dt>Subtotal</dt>
          <dd>
            {!loading ? (
              currencyFormat(subtotal)
            ) : (
              <div className="w-10 h-5 animate-pulse bg-neutral-700 rounded" />
            )}
          </dd>
        </div>
        <div className="opacity-70">
          <dt>Tax{taxPercentage && <span> ({taxPercentage}%)</span>}</dt>
          <dd>
            {!loading ? (
              currencyFormat(tax)
            ) : (
              <div className="w-10 h-5 animate-pulse bg-neutral-700 rounded" />
            )}
          </dd>
        </div>
        <div className="opacity-70">
          <dt>Shipping</dt>
          <dd>
            {!loading ? (
              currencyFormat(shipping)
            ) : (
              <div className="w-10 h-5 animate-pulse bg-neutral-700 rounded" />
            )}
          </dd>
        </div>
        <div className="font-bold text-lg">
          <dt>Total</dt>
          <dd>
            {!loading ? (
              currencyFormat(total)
            ) : (
              <div className="w-10 h-5 animate-pulse bg-neutral-700 rounded" />
            )}
          </dd>
        </div>
      </dl>
    </>
  );
};
