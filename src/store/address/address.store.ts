import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    address2?: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
  };
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        address2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
      },

      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address",
    },
  ),
);
