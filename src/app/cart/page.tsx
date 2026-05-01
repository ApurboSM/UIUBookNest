import type { Metadata } from "next";

import { CartContents } from "@/components/shop/cart-contents";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review the textbooks, stationery, and supplies you've added before heading to checkout for campus pickup or delivery.",
};

export default function CartPage() {
  return (
    <PageShell
      eyebrow="Your Cart"
      title={
        <>
          Review your{" "}
          <span className="text-gradient-brand">UIUBookNest</span> cart
        </>
      }
      description="Adjust quantities, remove items, then head to checkout to choose pickup or delivery and pay with bKash, Nagad, SSLCommerz, or Cash on Delivery."
    >
      <CartContents />
    </PageShell>
  );
}
