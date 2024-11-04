import { CartProduct } from "@/models/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  // updateProdcutQuantity: (value:number )=> void;
  // removeProduct: (id:string) => void;
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
        console.log(newCart);
      },
    }),
    { name: "shopping-cart" },
  ),
);
