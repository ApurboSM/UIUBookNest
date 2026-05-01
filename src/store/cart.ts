"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? { ...i, quantity: Math.max(0, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "uiu-booknest-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);

export function useCartCount() {
  return useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0)
  );
}
