import { ArrowRight, IdCard, PackageCheck, Search } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const steps = [
  {
    n: "01",
    icon: Search,
    title: "Browse & Add to Cart",
    description:
      "Search by title, author, or course code. Filter by category, school, or in-stock status — and add what you need.",
  },
  {
    n: "02",
    icon: IdCard,
    title: "Enter UIU Student ID",
    description:
      "At checkout, share your UIU Student ID, choose between Campus Pickup or Pathao/RedX delivery, and pick a payment method.",
  },
  {
    n: "03",
    icon: PackageCheck,
    title: "Pickup or Receive",
    description:
      "Show your ID at the campus counter or accept your Pathao/RedX delivery — pay with bKash, Nagad, or Cash on Delivery.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="How it Works"
          title={
            <>
              From cart to campus in{" "}
              <span className="text-gradient-brand">three steps</span>
            </>
          }
          description="No accounts to create. No friction. Just a clean path from picking your textbook to having it in hand."
        />

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent md:block"
            aria-hidden
          />
          {steps.map((s, i) => (
            <div key={s.n} className="relative flex flex-col items-start">
              <div className="relative flex size-[72px] items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--surface)] text-[var(--primary)] shadow-[0_8px_30px_-12px_rgba(232,103,26,0.3)]">
                <s.icon className="size-7" />
                <span className="absolute -top-2 -right-2 inline-flex size-7 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-black">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-6 font-serif text-2xl leading-tight tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {s.description}
              </p>
              {i < steps.length - 1 && (
                <ArrowRight className="absolute -right-3 top-9 hidden size-4 text-[var(--primary)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
