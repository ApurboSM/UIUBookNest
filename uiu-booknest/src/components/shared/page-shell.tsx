import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";

type PageShellProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-70" aria-hidden />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-soft)]">
            <span className="size-1.5 rounded-full bg-[var(--primary)]" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>

      <div className="container-page pb-24">{children}</div>
    </div>
  );
}

type ComingSoonPanelProps = {
  iterationLabel: string;
  features: { label: string; status: "planned" | "next" }[];
  primaryAction?: { href: string; label: string };
  secondaryAction?: { href: string; label: string };
};

export function ComingSoonPanel({
  iterationLabel,
  features,
  primaryAction,
  secondaryAction,
}: ComingSoonPanelProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-1 text-xs font-medium text-[var(--primary-soft)]">
          <Clock className="size-3.5" />
          Building next: {iterationLabel}
        </div>
        <h2 className="mt-5 font-serif text-2xl tracking-tight text-foreground md:text-3xl">
          What this page will do
        </h2>
        <ul className="mt-6 space-y-3">
          {features.map((f) => (
            <li
              key={f.label}
              className="flex items-start gap-3 rounded-lg border border-[var(--border)] bg-[#0d0d0d] p-3.5"
            >
              <CheckCircle2
                className={
                  f.status === "next"
                    ? "mt-0.5 size-5 shrink-0 text-[var(--primary)]"
                    : "mt-0.5 size-5 shrink-0 text-[var(--muted-2)]"
                }
              />
              <div className="min-w-0">
                <p className="text-sm leading-snug text-foreground">{f.label}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
                  {f.status === "next" ? "Next iteration" : "Planned"}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {(primaryAction || secondaryAction) && (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {primaryAction && (
              <Button asChild>
                <Link href={primaryAction.href}>
                  {primaryAction.label}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            )}
            {secondaryAction && (
              <Button asChild variant="outline">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <aside className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary-soft)]">
          Phase Map
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          UIUBookNest is shipping in five phases mapped to the MGT 3225
          checklist. The landing page, header, footer, and trust block are
          live. Cart, checkout, search, and the full product catalogue follow
          in the next iteration.
        </p>
        <div className="mt-6 grid gap-2 text-xs">
          {[
            { label: "Phase 1 · Setup", state: "done" },
            { label: "Phase 2 · Catalogue", state: "partial" },
            { label: "Phase 3 · Checkout", state: "next" },
            { label: "Phase 4 · Trust Block", state: "done" },
            { label: "Phase 5 · Final Checks", state: "later" },
          ].map((p) => (
            <div
              key={p.label}
              className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2"
            >
              <span className="text-foreground">{p.label}</span>
              <span
                className={
                  p.state === "done"
                    ? "rounded-full border border-[var(--success)]/40 bg-[var(--success)]/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--success)]"
                    : p.state === "partial"
                    ? "rounded-full border border-[var(--primary)]/40 bg-[var(--primary)]/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[var(--primary-soft)]"
                    : p.state === "next"
                    ? "rounded-full border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-foreground"
                    : "rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted"
                }
              >
                {p.state === "done"
                  ? "Done"
                  : p.state === "partial"
                  ? "In progress"
                  : p.state === "next"
                  ? "Up next"
                  : "Planned"}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
