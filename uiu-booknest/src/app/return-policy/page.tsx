import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Receipt, RefreshCcw, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Return Policy",
  description:
    "UIUBookNest return policy — items can be returned within 7 days of receipt with the original invoice. Read the full conditions.",
};

const highlights = [
  {
    icon: CalendarDays,
    title: "7-day return window",
    body: "From the date you collect or receive your order.",
  },
  {
    icon: Receipt,
    title: "Original invoice required",
    body: "The order receipt — printed or digital — is your proof of purchase.",
  },
  {
    icon: RefreshCcw,
    title: "Refund or exchange",
    body: "Choose either a like-for-like exchange or a full refund to your original payment method.",
  },
  {
    icon: ShieldCheck,
    title: "Consumer Rights aligned",
    body: "Process referenced against the Bangladesh Consumer Rights Protection Act 2009.",
  },
];

export default function ReturnPolicyPage() {
  return (
    <PageShell
      eyebrow="Policy · Returns"
      title={
        <>
          Returns &amp;{" "}
          <span className="text-gradient-brand">refunds</span>
        </>
      }
      description="UIUBookNest stands behind every textbook, supply, and merchandise SKU we ship. If something isn't right, here's how we make it right — within seven days, no questions asked."
    >
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <h.icon className="size-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{h.title}</p>
            <p className="mt-1 text-xs text-muted">{h.body}</p>
          </div>
        ))}
      </div>

      <article className="prose-policy max-w-3xl space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            1. Eligibility
          </h2>
          <p className="mt-3 text-muted">
            Items purchased on UIUBookNest may be returned within{" "}
            <span className="text-foreground">seven (7) calendar days</span> of
            receipt — counted from the date you pick the order up at the UIU
            Campus Store, or the date the Pathao / RedX rider hands it over.
            Returns are accepted with the original invoice, in unused condition
            and in their original packaging.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            2. Items not eligible for return
          </h2>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              ·{" "}
              <span className="text-foreground">Marked or written-on textbooks</span>{" "}
              — including highlights, annotations, or torn corners.
            </li>
            <li>
              · Stationery and exam-supply consumables that have been{" "}
              <span className="text-foreground">opened</span>{" "}
              (e.g., OMR sheet packs, pen packs).
            </li>
            <li>
              · Personalised UIU Merchandise such as{" "}
              <span className="text-foreground">custom-name lanyards</span>.
            </li>
            <li>
              · Any item without the original invoice or with the invoice
              materially altered.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            3. How to start a return
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
            <li>
              Email{" "}
              <a
                className="text-[var(--primary-soft)] hover:text-[var(--primary)]"
                href="mailto:support@uiubooknest.bd"
              >
                support@uiubooknest.bd
              </a>{" "}
              within 7 days of receipt with your order number and a short reason
              for the return.
            </li>
            <li>
              Bring the item and the invoice to the UIU Campus Store (Block A,
              Ground Floor) during operating hours — Sunday to Thursday, 9:00 AM
              to 6:30 PM.
            </li>
            <li>
              Choose{" "}
              <span className="text-foreground">refund</span> (back to your
              original bKash, Nagad, or cash payment) or{" "}
              <span className="text-foreground">exchange</span> for an in-stock
              SKU of equal value.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            4. Refund timing
          </h2>
          <p className="mt-3 text-muted">
            Cash refunds are processed at the campus counter on the spot. bKash
            and Nagad refunds are reversed within{" "}
            <span className="text-foreground">3 business days</span> of approval
            and you will receive a confirmation SMS from the originating MFS
            provider.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            5. Damaged or incorrect items
          </h2>
          <p className="mt-3 text-muted">
            If your order arrives damaged, defective, or incorrect, contact us{" "}
            <span className="text-foreground">within 48 hours</span> of receipt.
            We will arrange a free pickup via Pathao / RedX and either replace
            the item from stock or issue a full refund — at your choice — within
            5 business days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            6. Your statutory rights
          </h2>
          <p className="mt-3 text-muted">
            Nothing in this policy limits any right granted to you under the
            Bangladesh{" "}
            <span className="text-foreground">
              Consumer Rights Protection Act 2009
            </span>{" "}
            or the{" "}
            <span className="text-foreground">
              Bangladesh Digital Commerce Operations Guidelines 2021
              (DCOG-2021)
            </span>
            . Where a stronger statutory right applies, the statutory right
            prevails.
          </p>
        </section>

        <p className="text-xs text-muted">
          Last updated: 1 May 2026 · UIUBookNest, MGT 3225 E-Business · Group 07
          Section B.
        </p>
      </article>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/privacy-notice">Read Privacy Notice</Link>
        </Button>
      </div>
    </PageShell>
  );
}
