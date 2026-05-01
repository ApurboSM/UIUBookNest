import type { Metadata } from "next";

import { OrderConfirmationContents } from "@/components/shop/order-confirmation-contents";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Order received - your UIU pickup or delivery is on the way. View receipt and tracking details here.",
};

export default function OrderConfirmationPage() {
  return (
    <PageShell
      eyebrow="Order Confirmation"
      title={
        <>
          Order received &mdash;{" "}
          <span className="text-gradient-brand">we&rsquo;re on it</span>
        </>
      }
      description="Thanks for shopping with UIUBookNest. Here&rsquo;s a quick recap of what&rsquo;s coming and what to do next."
    >
      <OrderConfirmationContents />
    </PageShell>
  );
}
