import type { Metadata } from "next";
import Link from "next/link";
import { Building2, IdCard, Truck, Wallet } from "lucide-react";

import { PageShell, ComingSoonPanel } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout — Student ID, BOPIS & bKash",
  description:
    "The full UIU student-aware checkout: pickup at campus or Pathao/RedX delivery, paying with bKash, Nagad, or Cash on Delivery.",
};

const checkoutPreview = [
  {
    icon: IdCard,
    title: "UIU Student ID Field",
    body: "Required text field at checkout — anchors the surface-web vs deep-web distinction in our project report.",
  },
  {
    icon: Building2,
    title: "BOPIS — Pickup at UIU",
    body: "Free pickup option at the UIU Campus Store, Block A. Same-day on orders placed before 2 PM.",
  },
  {
    icon: Truck,
    title: "Home / Dorm Delivery",
    body: "Flat ৳60 delivery via Pathao or RedX across Dhaka, with live tracking and COD support.",
  },
  {
    icon: Wallet,
    title: "Pay with bKash · Nagad · COD",
    body: "Mobile financial services for instant settlement; Cash on Delivery for the campus regulars.",
  },
];

export default function CheckoutPage() {
  return (
    <PageShell
      eyebrow="Checkout · Phase 3"
      title={
        <>
          The single most important{" "}
          <span className="text-gradient-brand">student journey</span>
        </>
      }
      description="The MGT 3225 brief calls Checkout the most critical phase. Here's exactly how UIUBookNest will deliver on it."
    >
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {checkoutPreview.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <item.icon className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <ComingSoonPanel
        iterationLabel="Phase 3 · Functional checkout flow"
        features={[
          { label: "Required UIU Student ID input with format validation", status: "next" },
          { label: "Shipping selector — Pickup at UIU (৳0) or Home Delivery (৳60)", status: "next" },
          { label: "Payment selector — bKash, Nagad, or Cash on Delivery (default)", status: "next" },
          { label: "Order summary with BDT subtotal, shipping, and grand total", status: "next" },
          { label: "Place Order action that writes a mock order and redirects to confirmation", status: "next" },
        ]}
        primaryAction={{ href: "/shop", label: "Add Items to Cart" }}
        secondaryAction={{ href: "/return-policy", label: "Read Return Policy" }}
      />
    </PageShell>
  );
}
