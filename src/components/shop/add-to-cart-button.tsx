"use client";

import * as React from "react";
import Link from "next/link";
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
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setJustAdded(false), 1800);
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
    <div className="flex flex-wrap items-center gap-3">
      <Button
        size="xl"
        onClick={handleAdd}
        className={justAdded ? "bg-[var(--success)] hover:bg-[var(--success)]" : undefined}
      >
        {justAdded ? (
          <>
            <Check className="size-4" />
            Added to Cart
          </>
        ) : inCartQty > 0 && hydrated ? (
          <>
            <Plus className="size-4" />
            Add Another ({inCartQty} in cart)
          </>
        ) : (
          <>
            <ShoppingBag className="size-4" />
            Add to Cart
          </>
        )}
      </Button>

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
  );
}
