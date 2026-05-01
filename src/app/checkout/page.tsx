import type { Metadata } from "next";

import { CheckoutForm } from "@/components/shop/checkout-form";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Checkout — Student ID, BOPIS & bKash",
  description:
    "The UIU student-aware checkout: pickup at campus or Pathao/RedX delivery, paying with bKash, Nagad, SSLCommerz, or Cash on Delivery.",
};

export default function CheckoutPage() {
  return (
    <PageShell
      eyebrow="Checkout"
      title={
        <>
          One last step to your{" "}
          <span className="text-gradient-brand">books</span>
        </>
      }
      description="Confirm your UIU Student ID, choose pickup or Pathao/RedX delivery, and pay with bKash, Nagad, SSLCommerz, or Cash on Delivery."
    >
      <CheckoutForm />
    </PageShell>
  );
}
