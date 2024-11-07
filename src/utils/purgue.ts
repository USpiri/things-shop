import { Address } from "@/models/address.interface";

export const purgueAddress = (address: Address) => {
  delete address["rememberAddress" as keyof Address];
  delete address["id" as keyof Address];
  delete address["userId" as keyof Address];
  return address;
};
