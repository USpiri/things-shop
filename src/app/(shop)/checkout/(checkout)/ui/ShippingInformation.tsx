"use client";
import { Button, SubTitle } from "@/components";
import { useAddressStore } from "@/store";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";

export const ShippingInformation = () => {
  const [loaded, setLoaded] = useState(false);
  const {
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
  } = useAddressStore((state) => state.address);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <SubTitle className="text-lg font-mono">Shipping Information</SubTitle>
      {loaded ? (
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
          <Button
            className="mb-3 max-md:w-full max-md:mt-3 sm:col-span-2 md:absolute top-0 right-0"
            variant="ghost"
            link
            href="/checkout/address"
          >
            <PenLine className="w-4 h-4" />
            Edit
          </Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
