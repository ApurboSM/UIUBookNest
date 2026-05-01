import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileText, MessageSquare } from "lucide-react";

import { PageShell, ComingSoonPanel } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

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
          Order received —{" "}
          <span className="text-gradient-brand">we&rsquo;re on it</span>
        </>
      }
      description="A friendly confirmation page that closes the purchase journey. Once checkout ships, this page will display your real order number, items, and pickup/delivery instructions."
    >
      <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/[0.06] p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--success)]">
                Mock Confirmation Preview
              </p>
              <p className="mt-1 font-serif text-2xl text-foreground">
                Order #UBN-2026-00128
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                UIU Student ID
              </dt>
              <dd className="mt-1 font-mono text-sm text-foreground">
                0112230XXX
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Payment
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                bKash · ৳3,460
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Fulfilment
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Pickup · UIU Campus Store
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Ready by
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Today, 4:30 PM
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                <MessageSquare className="size-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <FileText className="size-5 text-[var(--primary)]" />
          <h3 className="mt-4 font-serif text-xl text-foreground">
            What you&rsquo;ll see here
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>• Real order number generated from cart submission</li>
            <li>• Itemized receipt with each title, quantity, and BDT line</li>
            <li>• Pickup time slot or Pathao/RedX tracking link</li>
            <li>• Email-style confirmation copy you can screenshot</li>
          </ul>
        </aside>
      </div>

      <ComingSoonPanel
        iterationLabel="Phase 3 · End of purchase journey"
        features={[
          { label: "Persistent order ID, generated server-side", status: "next" },
          { label: "Itemized line items pulled from the cart at submit time", status: "next" },
          { label: "Print-friendly receipt for the campus store counter", status: "planned" },
          { label: "Email mock that mirrors the on-screen confirmation", status: "planned" },
        ]}
        primaryAction={{ href: "/", label: "Back to Home" }}
      />
    </PageShell>
  );
}
