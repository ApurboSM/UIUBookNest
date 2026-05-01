"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bell, Check, Plus, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const hydrated = useHydrated();
  const addItem = useCartStore((s) => s.addItem);
  const inCartQty = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0
  );

  const [justAdded, setJustAdded] = React.useState(false);
  const [bursts, setBursts] = React.useState<number[]>([]);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem(product.id, 1);
    setJustAdded(true);
    setBursts((prev) => [...prev, Date.now()]);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 2000);
  };

  if (!product.inStock) {
    return (
      <Button size="xl" disabled>
        <Bell className="size-4" />
        Notify when Restocked
      </Button>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <motion.div
          className="relative"
          animate={
            justAdded ? { scale: [1, 1.05, 1] } : { scale: 1 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Button
            size="xl"
            onClick={handleAdd}
            className={`relative overflow-hidden transition-colors ${
              justAdded
                ? "bg-[var(--success)] hover:bg-[var(--success)] shadow-[0_8px_30px_-8px_rgba(34,197,94,0.6)]"
                : ""
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="added"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-flex items-center gap-2"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 18,
                    }}
                    className="inline-flex size-5 items-center justify-center rounded-full bg-black/15"
                  >
                    <Check className="size-3.5 stroke-[3]" />
                  </motion.span>
                  Added to Cart!
                </motion.span>
              ) : inCartQty > 0 && hydrated ? (
                <motion.span
                  key="inCart"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  <Plus className="size-4" />
                  Add Another ({inCartQty} in cart)
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex items-center gap-2"
                >
                  <ShoppingBag className="size-4" />
                  Add to Cart
                </motion.span>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {justAdded && (
                <motion.span
                  key="ripple"
                  initial={{ opacity: 0.6, scale: 0 }}
                  animate={{ opacity: 0, scale: 2.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 m-auto size-full rounded-md bg-white/30"
                />
              )}
            </AnimatePresence>
          </Button>

          <AnimatePresence>
            {bursts.map((id) => (
              <FloatingPlusOne key={id} />
            ))}
          </AnimatePresence>
        </motion.div>

        {hydrated && inCartQty > 0 ? (
          <Button asChild size="xl" variant="outline">
            <Link href="/cart">
              View Cart
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild size="xl" variant="outline">
            <Link href="/shop">Keep Browsing</Link>
          </Button>
        )}
      </div>

      <AnimatePresence>
        {justAdded && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--success)]/30 bg-[var(--success)]/10 px-3 py-1.5 text-xs text-[var(--success)]"
          >
            <Check className="size-3.5" />
            <span>
              Saved to your cart — keep shopping or head to checkout.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingPlusOne() {
  return (
    <motion.span
      initial={{ opacity: 0, y: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-4, -28, -52, -78], scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="pointer-events-none absolute inset-x-0 -top-2 mx-auto inline-flex w-fit items-center gap-1 rounded-full border border-[var(--success)]/40 bg-[var(--success)]/15 px-2 py-0.5 text-[11px] font-semibold text-[var(--success)]"
    >
      <Plus className="size-3 stroke-[3]" />1 added
    </motion.span>
  );
}
