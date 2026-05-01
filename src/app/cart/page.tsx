import type { Metadata } from "next";
import Link from "next/link";
import { Building2, ShoppingBag, Truck, Wallet } from "lucide-react";

import { ProductCard } from "@/components/shop/product-card";
import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the textbooks, stationery, and supplies you've added before heading to checkout for campus pickup or delivery.",
};

const reassurances = [
  {
    icon: Building2,
    title: "Free Campus Pickup",
    body: "Collect from the UIU Campus Store, Block A — usually same day.",
  },
  {
    icon: Truck,
    title: "Pathao & RedX Delivery",
    body: "Flat ৳60 across Dhaka with live order tracking.",
  },
  {
    icon: Wallet,
    title: "bKash · Nagad · COD",
    body: "Pay the way you already do every day.",
  },
];

export default function CartPage() {
  const suggestions = getFeaturedProducts(4);

  return (
    <PageShell
      eyebrow="Cart · 0 items"
      title={
        <>
          Your{" "}
          <span className="text-gradient-brand">UIUBookNest</span> cart
        </>
      }
      description="When you add textbooks, stationery, or merchandise from the shop, they'll appear here ready for checkout."
    >
      <div className="mb-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-8 py-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl tracking-tight md:text-3xl">
          Your cart is empty
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted">
          Browse the shop to add your first textbook. You can pay with bKash,
          Nagad, or Cash on Delivery at checkout.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/courses">Browse by Course</Link>
          </Button>
        </div>
      </div>

      <div className="mb-16 grid gap-4 sm:grid-cols-3">
        {reassurances.map((r) => (
          <div
            key={r.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <r.icon className="size-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{r.title}</p>
            <p className="mt-1 text-xs text-muted">{r.body}</p>
          </div>
        ))}
      </div>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
              Featured Textbooks
            </p>
            <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
              Popular with UIU students
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
          >
            See all textbooks
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {suggestions.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
