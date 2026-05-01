import { Award, FileCheck2, Scale, ShieldCheck } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "DBID Registration",
    body: "Digital Business Identity pending with e-CAB 2024 — placeholder visible site-wide for transparency.",
    pill: "e-CAB 2024",
  },
  {
    icon: FileCheck2,
    title: "DCOG-2021 Compliant",
    body: "Operates under the Bangladesh Digital Commerce Operations Guidelines 2021 with clear product, price, and refund disclosure.",
    pill: "DCOG-2021",
  },
  {
    icon: Scale,
    title: "Consumer Rights Protection Act 2009",
    body: "Privacy notice and refund handling reference Sections 4 & 6 — students can dispute and return within 7 days.",
    pill: "CRPA 2009",
  },
  {
    icon: Award,
    title: "Built with UIU",
    body: "An MGT 3225 E-Business Spring 2026 capstone project — Group 07, Section B. Made by students, for students.",
    pill: "MGT 3225",
  },
];

export function TrustBadges() {
  return (
    <section className="relative border-t border-[var(--border)] bg-[#0c0c0c] py-20 md:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-soft)]">
            <span className="size-1.5 rounded-full bg-[var(--primary)]" />
            Trust &amp; Compliance
          </div>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-balance md:text-4xl">
            Built on Bangladesh&rsquo;s{" "}
            <span className="text-gradient-brand">e-commerce trust framework</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            UIUBookNest answers Bangladesh&rsquo;s online-trust deficit head-on, with
            visible regulatory anchors and a clear return path on every order.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.title}
              className="relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors hover:border-[var(--primary)]/40"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <b.icon className="size-5" />
                </div>
                <span className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {b.pill}
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {b.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
