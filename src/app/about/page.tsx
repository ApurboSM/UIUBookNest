import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Layers, Sparkles, Users } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About UIUBookNest",
  description:
    "UIUBookNest is an MGT 3225 E-Business prototype by Group 07 Section B — designed to solve the textbook trust gap for UIU students.",
};

const pillars = [
  {
    icon: GraduationCap,
    title: "Built for UIU students",
    body:
      "Curated against UIU's Spring 2026 syllabus across CSE, EEE, BBA, Pharmacy, and Humanities. Recommendations land on what's actually assigned.",
  },
  {
    icon: Layers,
    title: "Omnichannel first",
    body:
      "BOPIS pickup at the UIU Campus Store and Pathao/RedX delivery — both surfaced before checkout, not buried in a sub-menu.",
  },
  {
    icon: Sparkles,
    title: "Trust by design",
    body:
      "DBID, DCOG-2021, and the Consumer Rights Protection Act 2009 are visible in the footer of every page. Not a hidden disclaimer.",
  },
  {
    icon: Users,
    title: "An academic capstone",
    body:
      "An MGT 3225 E-Business project by Md Abidur Rahman, Tahmeed Imam, Jihan Mahamud, and Muhammad Maruf Khan.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title={
        <>
          A campus bookstore designed for{" "}
          <span className="text-gradient-brand">student trust</span>
        </>
      }
      description="UIUBookNest is the MGT 3225 E-Business Spring 2026 capstone for Group 07, Section B. We're solving a real problem we feel every trimester — the textbook scramble — with an honest, omnichannel storefront."
    >
      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
              <p.icon className="size-5" />
            </div>
            <h3 className="mt-5 font-serif text-xl text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-8 md:p-10">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
              The problem we&rsquo;re solving
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Every UIU trimester, students lose hours and money chasing
              textbooks across scattered Facebook groups, photocopy shops, and
              questionable PDFs. There&rsquo;s no single, trusted, in-stock view of
              what your course actually needs — and no campus-aware delivery to
              boot.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              UIUBookNest collapses that journey into one storefront with a
              transparent BDT price, a verified stock badge, a campus pickup
              option, and a payment method that works in Bangladesh.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
              Our team
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Md Abidur Rahman",
                "Tahmeed Imam",
                "Jihan Mahamud",
                "Muhammad Maruf Khan",
              ].map((name) => (
                <li
                  key={name}
                  className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5"
                >
                  <span className="text-foreground">{name}</span>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    Group 07 · Sec B
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/shop">Explore the Catalogue</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
}
