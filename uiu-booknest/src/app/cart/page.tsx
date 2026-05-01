import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

import { PageShell, ComingSoonPanel } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the textbooks, stationery, and supplies you've added before heading to checkout for campus pickup or delivery.",
};

export default function CartPage() {
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

      <ComingSoonPanel
        iterationLabel="Phase 3 · Cart with quantity controls"
        features={[
          { label: "Persistent cart powered by Zustand with localStorage backup", status: "next" },
          { label: "Quantity stepper, item removal, and live BDT subtotal", status: "next" },
          { label: "BOPIS vs Delivery toggle with shipping cost preview (৳0 / ৳60)", status: "next" },
          { label: "Promotional code field for upcoming UIU student discounts", status: "planned" },
        ]}
        primaryAction={{ href: "/shop", label: "Browse Catalogue" }}
        secondaryAction={{ href: "/checkout", label: "See Checkout Plan" }}
      />
    </PageShell>
  );
}
