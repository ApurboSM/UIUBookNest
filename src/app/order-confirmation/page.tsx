import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Wallet,
} from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Order received - your UIU pickup or delivery is on the way. View receipt and tracking details here.",
};

const nextSteps = [
  {
    icon: CheckCircle2,
    title: "Confirmation sent",
    body: "A copy of this receipt is on its way to your UIU email.",
  },
  {
    icon: Clock,
    title: "Ready by 4:30 PM today",
    body: "We\u2019ll set your books aside at the campus counter.",
  },
  {
    icon: MapPin,
    title: "UIU Campus Store",
    body: "Block A, Ground Floor \u2014 Sun\u2013Thu, 9:00 AM\u20136:30 PM.",
  },
];

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
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/[0.06] p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--success)]">
                Confirmed
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
              <dd className="mt-1 inline-flex items-center gap-2 text-sm text-foreground">
                <Wallet className="size-4 text-[var(--primary)]" />
                bKash &middot; ৳3,460
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Fulfilment
              </dt>
              <dd className="mt-1 text-sm text-foreground">
                Pickup &middot; UIU Campus Store
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted">
                Ready by
              </dt>
              <dd className="mt-1 text-sm text-foreground">Today, 4:30 PM</dd>
            </div>
          </dl>

          <div className="mt-8 rounded-xl border border-[var(--border)] bg-[#0d0d0d] p-4">
            <p className="text-xs uppercase tracking-wider text-muted">
              Items in this order
            </p>
            <ul className="mt-3 divide-y divide-[var(--border)] text-sm">
              <li className="flex items-center justify-between gap-3 py-2">
                <span className="text-foreground">
                  Principles of Economics &mdash; Mankiw
                </span>
                <span className="font-mono text-muted">৳1,850</span>
              </li>
              <li className="flex items-center justify-between gap-3 py-2">
                <span className="text-foreground">
                  Casio fx-991EX ClassWiz Calculator
                </span>
                <span className="font-mono text-muted">৳1,610</span>
              </li>
              <li className="flex items-center justify-between gap-3 py-2 text-base font-semibold">
                <span className="text-foreground">Total</span>
                <span className="font-mono text-foreground">৳3,460</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                <MessageSquare className="size-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          {nextSteps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                <s.icon className="size-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">
                {s.title}
              </p>
              <p className="mt-1 text-xs text-muted">{s.body}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-5 text-xs text-muted">
            <p className="font-semibold text-foreground">Need to change something?</p>
            <p className="mt-2">
              Email us at{" "}
              <a
                className="text-[var(--primary-soft)] hover:text-[var(--primary)]"
                href="mailto:support@uiubooknest.bd"
              >
                support@uiubooknest.bd
              </a>{" "}
              within 30 minutes of placing your order and we&rsquo;ll cancel or
              update it for you.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
