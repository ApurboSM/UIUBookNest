import type { Metadata } from "next";
import Link from "next/link";
import { Database, EyeOff, KeyRound, ShieldCheck } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How UIUBookNest collects, uses, and protects student data. Compliant with Bangladesh's Consumer Rights Protection Act 2009 and DCOG-2021.",
};

const principles = [
  {
    icon: ShieldCheck,
    title: "Data we hold",
    body: "Order details, UIU Student ID for fulfilment, contact info for delivery, and payment confirmation references.",
  },
  {
    icon: Database,
    title: "Where it lives",
    body: "Stored on UIUBookNest's servers, segregated from public-facing pages — never sold, shared, or leased.",
  },
  {
    icon: KeyRound,
    title: "How we secure it",
    body: "Encrypted at rest, transmitted over HTTPS, and accessed only by the on-campus operations team.",
  },
  {
    icon: EyeOff,
    title: "Your control",
    body: "Request access, correction, or deletion of your data at any time by emailing support@uiubooknest.bd.",
  },
];

export default function PrivacyNoticePage() {
  return (
    <PageShell
      eyebrow="Policy · Privacy"
      title={
        <>
          Your data,{" "}
          <span className="text-gradient-brand">held lightly</span>
        </>
      }
      description="UIUBookNest collects only what's needed to fulfil an order at the UIU Campus Store or via Pathao / RedX. This notice explains exactly what we keep, why we keep it, and how to ask for it back."
    >
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <p.icon className="size-5" />
            </div>
            <p className="mt-4 text-sm font-semibold text-foreground">{p.title}</p>
            <p className="mt-1 text-xs text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <article className="prose-policy max-w-3xl space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            1. The data we collect
          </h2>
          <p className="mt-3 text-muted">
            When you place an order, UIUBookNest collects (a) your name and
            contact number; (b) your{" "}
            <span className="text-foreground">UIU Student ID</span>, used to
            verify pickup at the campus counter; (c) a delivery address if you
            choose Pathao / RedX delivery; and (d) a payment confirmation
            reference from bKash, Nagad, or our Cash on Delivery log. We do not
            store full bKash or Nagad PINs, OTPs, or card details — those are
            handled by the respective payment provider.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            2. Why we collect it
          </h2>
          <p className="mt-3 text-muted">
            Your data is used only to fulfil your order, communicate updates
            (e.g. &ldquo;your books are ready for pickup&rdquo;), process returns, and meet
            our recordkeeping obligations under the Bangladesh{" "}
            <span className="text-foreground">
              Digital Commerce Operations Guidelines 2021 (DCOG-2021)
            </span>
            .
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            3. Who we share it with
          </h2>
          <ul className="mt-3 space-y-2 text-muted">
            <li>
              ·{" "}
              <span className="text-foreground">Pathao or RedX</span> — only
              when you select delivery, and only the delivery name, address, and
              phone number.
            </li>
            <li>
              ·{" "}
              <span className="text-foreground">bKash / Nagad</span> — payment
              gateway confirmation flows. PINs and OTPs are never seen by us.
            </li>
            <li>
              · Internal UIUBookNest operations team — for fulfilment and
              support only.
            </li>
            <li>
              · We do not sell, rent, or trade your personal data to any third
              party for marketing purposes.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            4. Your rights
          </h2>
          <p className="mt-3 text-muted">
            Under the Bangladesh{" "}
            <span className="text-foreground">
              Consumer Rights Protection Act 2009
            </span>{" "}
            and DCOG-2021, you may at any time:
          </p>
          <ul className="mt-3 space-y-2 text-muted">
            <li>· Request a copy of the data we hold about you.</li>
            <li>· Ask us to correct any inaccurate information.</li>
            <li>
              · Request deletion of your data once your order and any return
              window have closed.
            </li>
            <li>· Withdraw consent for any non-essential communications.</li>
          </ul>
          <p className="mt-3 text-muted">
            Email{" "}
            <a
              className="text-[var(--primary-soft)] hover:text-[var(--primary)]"
              href="mailto:support@uiubooknest.bd"
            >
              support@uiubooknest.bd
            </a>{" "}
            to exercise any of these rights — we respond within 5 business days.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            5. Cookies &amp; analytics
          </h2>
          <p className="mt-3 text-muted">
            UIUBookNest uses a minimal set of strictly necessary cookies to keep
            your cart contents between page navigations. We do not run
            third-party advertising trackers. If aggregated, anonymised
            analytics are added in a future iteration, this notice will be
            updated and clearly communicated.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            6. Data retention
          </h2>
          <p className="mt-3 text-muted">
            Order data is retained for{" "}
            <span className="text-foreground">12 months</span> from the order
            date — the minimum needed to honour returns and audit the books.
            Beyond that, identifying fields are anonymised unless statute
            requires longer retention.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
            7. Contact &amp; complaints
          </h2>
          <p className="mt-3 text-muted">
            For any question about this notice, contact us at{" "}
            <a
              className="text-[var(--primary-soft)] hover:text-[var(--primary)]"
              href="mailto:support@uiubooknest.bd"
            >
              support@uiubooknest.bd
            </a>{" "}
            or in person at the UIU Campus Store. If your concern remains
            unresolved, you may escalate to the Directorate of National Consumer
            Rights Protection under the Consumer Rights Protection Act 2009.
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
          <Link href="/return-policy">Read Return Policy</Link>
        </Button>
      </div>
    </PageShell>
  );
}
