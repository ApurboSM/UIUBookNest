import Link from "next/link";
import { ArrowRight, Building2, Truck } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

const options = [
  {
    icon: Building2,
    title: "Pickup at UIU Campus Store",
    price: "৳0",
    priceLabel: "Free",
    description:
      "Order online, collect from the Ground Floor Block A counter the same day. Just bring your UIU Student ID.",
    bullets: [
      "Same-day collection on orders before 2 PM",
      "Zero delivery fee — no surprises",
      "Show student ID at counter to claim",
    ],
    accent: "primary",
  },
  {
    icon: Truck,
    title: "Home / Dorm Delivery",
    price: "৳60",
    priceLabel: "Flat fee",
    description:
      "Delivered across Dhaka via Pathao & RedX with live tracking. Most orders arrive within 24 hours.",
    bullets: [
      "Citywide coverage in Dhaka",
      "Tracked through Pathao or RedX",
      "Cash on Delivery available at the door",
    ],
    accent: "muted",
  },
] as const;

export function BopisBanner() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#161616] via-[#121212] to-[#0d0d0d] p-8 md:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="BOPIS · Buy Online, Pickup In-Store"
                title={
                  <>
                    Two ways to get your books —{" "}
                    <span className="text-gradient-brand">your call</span>
                  </>
                }
                description="UIUBookNest is built for both campus regulars and dorm-bound students. Pick what fits your day."
              />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/shop">
                    Start Shopping
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="inline-flex h-7 items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 font-semibold text-[#E2136E]">
                    bKash
                  </span>
                  <span className="inline-flex h-7 items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 font-semibold text-[#F26522]">
                    Nagad
                  </span>
                  <span className="inline-flex h-7 items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 font-semibold text-foreground">
                    COD
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {options.map((opt) => {
                const isPrimary = opt.accent === "primary";
                return (
                  <div
                    key={opt.title}
                    className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 ${
                      isPrimary
                        ? "border-[var(--primary)]/40 bg-[var(--primary)]/[0.06]"
                        : "border-[var(--border-strong)] bg-[var(--surface)]"
                    }`}
                  >
                    {isPrimary && (
                      <div
                        className="absolute -right-12 -top-12 size-32 rounded-full bg-[var(--primary)]/30 blur-3xl"
                        aria-hidden
                      />
                    )}
                    <div className="relative flex items-center justify-between">
                      <div
                        className={`flex size-11 items-center justify-center rounded-xl border ${
                          isPrimary
                            ? "border-[var(--primary)]/40 bg-[var(--primary)]/15 text-[var(--primary)]"
                            : "border-[var(--border-strong)] bg-[var(--surface-2)] text-foreground"
                        }`}
                      >
                        <opt.icon className="size-5" />
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-serif text-2xl ${
                            isPrimary ? "text-[var(--primary-soft)]" : "text-foreground"
                          }`}
                        >
                          {opt.price}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted">
                          {opt.priceLabel}
                        </div>
                      </div>
                    </div>
                    <h3 className="relative mt-5 text-lg font-semibold text-foreground">
                      {opt.title}
                    </h3>
                    <p className="relative mt-2 text-sm text-muted">
                      {opt.description}
                    </p>
                    <ul className="relative mt-5 space-y-2 border-t border-[var(--border)] pt-4">
                      {opt.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-xs text-muted"
                        >
                          <span
                            className={`mt-1 size-1.5 shrink-0 rounded-full ${
                              isPrimary
                                ? "bg-[var(--primary)]"
                                : "bg-[var(--border-strong)]"
                            }`}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
