"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Order } from "@/types";

type OrderState = {
  lastOrder: Order | null;
  setLastOrder: (order: Order) => void;
  clearLastOrder: () => void;
};

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      setLastOrder: (order) => set({ lastOrder: order }),
      clearLastOrder: () => set({ lastOrder: null }),
    }),
    {
      name: "uiu-booknest-last-order",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
