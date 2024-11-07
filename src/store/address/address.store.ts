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
  clearAddress: () => void;
}

const initialState = {
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
};

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      ...initialState,

      setAddress: (address) => {
        set({ address });
      },
      clearAddress: () => set({ ...initialState }),
    }),
    {
      name: "address",
    },
  ),
);
