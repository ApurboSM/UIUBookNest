import type { Metadata } from "next";
import Link from "next/link";
import { Building2, IdCard, ShieldCheck, Truck, Wallet } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Checkout — Student ID, BOPIS & bKash",
  description:
    "The UIU student-aware checkout: pickup at campus or Pathao/RedX delivery, paying with bKash, Nagad, or Cash on Delivery.",
};

const fulfilmentOptions = [
  {
    icon: Building2,
    title: "Pickup at UIU Campus",
    badge: "Free · ৳0",
    body: "Collect from the Ground Floor Block A counter. Same-day on orders before 2 PM. Bring your UIU Student ID.",
    accent: true,
  },
  {
    icon: Truck,
    title: "Home / Dorm Delivery",
    badge: "Flat ৳60",
    body: "Tracked Pathao or RedX rider across Dhaka. Most orders arrive within 24 hours. COD available.",
    accent: false,
  },
];

const paymentOptions = [
  {
    icon: Wallet,
    title: "bKash",
    body: "Instant settlement via the most-used MFS in Bangladesh.",
  },
  {
    icon: Wallet,
    title: "Nagad",
    body: "Pay directly from your Nagad wallet, no card needed.",
  },
  {
    icon: Wallet,
    title: "Cash on Delivery",
    body: "Pay in cash when you collect or receive your order.",
  },
];

export default function CheckoutPage() {
  return (
    <PageShell
      eyebrow="Checkout"
      title={
        <>
          Two ways to receive,{" "}
          <span className="text-gradient-brand">three ways to pay</span>
        </>
      }
      description="Built for UIU students — share your Student ID, pick how you want your books, and choose the payment method that already lives on your phone."
    >
      <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <IdCard className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                Step 1
              </p>
              <h3 className="font-serif text-xl text-foreground">
                UIU Student ID
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Enter your UIU Student ID at checkout — it confirms eligibility for
            campus pickup and unlocks any active student-only pricing.
          </p>
          <div className="mt-5 rounded-lg border border-[var(--border)] bg-[#0d0d0d] px-4 py-3 font-mono text-sm text-muted">
            011XXXXXXX <span className="ml-2 text-[10px] uppercase text-[var(--muted-2)]">format</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                Step 2
              </p>
              <h3 className="font-serif text-xl text-foreground">
                Fulfilment &amp; payment
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Choose pickup at the UIU Campus Store or Pathao/RedX delivery, then
            settle with bKash, Nagad, or Cash on Delivery. Order summary
            updates the BDT total live.
          </p>
        </div>
      </div>

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
            Fulfilment
          </p>
          <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
            How would you like your books?
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {fulfilmentOptions.map((opt) => (
            <div
              key={opt.title}
              className={`relative overflow-hidden rounded-2xl border p-6 ${
                opt.accent
                  ? "border-[var(--primary)]/40 bg-[var(--primary)]/[0.06]"
                  : "border-[var(--border-strong)] bg-[var(--surface)]"
              }`}
            >
              {opt.accent && (
                <div
                  className="absolute -right-12 -top-12 size-32 rounded-full bg-[var(--primary)]/30 blur-3xl"
                  aria-hidden
                />
              )}
              <div className="relative flex items-start justify-between gap-3">
                <div
                  className={`flex size-11 items-center justify-center rounded-xl border ${
                    opt.accent
                      ? "border-[var(--primary)]/40 bg-[var(--primary)]/15 text-[var(--primary)]"
                      : "border-[var(--border-strong)] bg-[var(--surface-2)] text-foreground"
                  }`}
                >
                  <opt.icon className="size-5" />
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    opt.accent
                      ? "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary-soft)]"
                      : "border-[var(--border-strong)] bg-[var(--surface-2)] text-muted"
                  }`}
                >
                  {opt.badge}
                </span>
              </div>
              <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                {opt.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">
                {opt.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
            Payment
          </p>
          <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
            Pay the way you already do
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {paymentOptions.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center gap-2">
                <div className="flex size-9 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <p.icon className="size-4" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  {p.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#161106] via-[#1a1208] to-[#0d0d0d] p-8 md:p-12">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
              Got items in your cart?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted md:text-base">
              Head to your cart to review what you&rsquo;ve picked, or jump
              back into the catalogue to add a few more before you check out.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Button asChild size="lg">
              <Link href="/cart">View Cart</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/shop">Keep Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
