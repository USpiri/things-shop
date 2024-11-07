import { CartProduct } from "@/models/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  getSummaryInformation: (
    tax: number,
    shipping: number,
  ) => {
    subTotal: number;
    tax: number;
    shipping: number;
    total: number;
  };
  updateProdcutQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const { cart } = get();

        const productInCart = cart.some(
          (p) => p.id === product.id && p.size === product.size,
        );

        if (!productInCart) return set({ cart: [...cart, product] });

        const newCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return { ...item };
        });
        set({ cart: [...newCart] });
      },

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSummaryInformation: (_tax, _shipping) => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0,
        );
        const tax = subTotal * _tax;
        const total = subTotal + tax + _shipping;

        return { subTotal, tax, shipping: _shipping, total };
      },

      updateProdcutQuantity: (product, quantity) => {
        const { cart } = get();

        const newCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity };
          }
          return { ...item };
        });

        set({ cart: [...newCart] });
      },

      removeProduct: (product) => {
        const { cart } = get();

        const newCart = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        );

        set({
          cart: newCart,
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: "shopping-cart" },
  ),
);
