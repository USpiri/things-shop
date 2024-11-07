"use client";
import { Shipping } from "@/components";
import { useAddressStore } from "@/store";
import { useEffect, useState } from "react";

export const ShippingInformation = () => {
  const [loaded, setLoaded] = useState(false);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return <Shipping {...address} loading={!loaded} />;
};
