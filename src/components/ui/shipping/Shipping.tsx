import { PenLine } from "lucide-react";
import { Button } from "../button/Button";
import { SubTitle } from "../title/SubTitle";

interface Props {
  loading?: boolean;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  address2?: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  editButton?: boolean;
}

export const Shipping = ({
  name,
  lastname,
  email,
  phone,
  address,
  address2,
  country,
  city,
  state,
  postalCode,
  loading = false,
  editButton = true,
}: Props) => {
  return (
    <>
      <SubTitle className="text-lg font-mono">Shipping Information</SubTitle>
      {!loading ? (
        <div className="text-sm text-neutral-400 font-mono grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 relative">
          <p>
            {name} {lastname}
          </p>
          <p>{email}</p>
          <p>{phone}</p>
          <p>{address}</p>
          {address2 && <p>Alternative: {address2}</p>}
          <p>
            {country}, {state}, {city}, {postalCode}
          </p>
          {editButton && (
            <Button
              className="mb-3 max-md:w-full max-md:mt-3 sm:col-span-2 md:absolute top-0 right-0"
              variant="ghost"
              link
              href="/checkout/address"
            >
              <PenLine className="w-4 h-4" />
              Edit
            </Button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
