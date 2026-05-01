import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, GraduationCap } from "lucide-react";

import { PageShell } from "@/components/shared/page-shell";
import { Button } from "@/components/ui/button";
import { schools, ELMS_SPRING_2026 } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — Browse by UIU School",
  description:
    "Find textbooks for your UIU course. Curated samples across the four schools, deep-linked to the official UIU eLMS Spring 2026 catalogue.",
};

export default function CoursesPage() {
  return (
    <PageShell
      eyebrow="Courses · Spring 2026"
      title={
        <>
          Browse by UIU{" "}
          <span className="text-gradient-brand">School &amp; Department</span>
        </>
      }
      description="Each school card opens directly into the official UIU eLMS catalogue, so you always reach the canonical course list. Use the matching textbook shortcut to land on what's in stock."
    >
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" size="lg">
          <Link href={ELMS_SPRING_2026} target="_blank" rel="noreferrer noopener">
            Open UIU eLMS Spring 2026
            <ExternalLink className="size-4" />
          </Link>
        </Button>
        <Button asChild size="lg">
          <Link href="/shop?category=textbooks">Shop all Textbooks</Link>
        </Button>
      </div>

      <div className="grid gap-5">
        {schools.map((school) => (
          <article
            key={school.slug}
            id={school.slug}
            className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                  <GraduationCap className="size-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                    School
                  </p>
                  <h2 className="font-serif text-2xl leading-tight tracking-tight text-foreground md:text-3xl">
                    {school.name}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {school.description}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button asChild variant="outline" size="md">
                  <Link href={school.elmsUrl} target="_blank" rel="noreferrer noopener">
                    eLMS
                    <ExternalLink className="size-3.5" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {school.departments.map((dept) => (
                <div
                  key={dept.code}
                  className="rounded-xl border border-[var(--border)] bg-[#0d0d0d] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[var(--primary-soft)]">
                      {dept.code}
                    </span>
                    <Link
                      href={dept.elmsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted hover:text-foreground"
                    >
                      eLMS
                      <ExternalLink className="size-3" />
                    </Link>
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {dept.name}
                  </p>
                  <ul className="mt-3 space-y-1.5 border-t border-[var(--border)] pt-3">
                    {dept.sampleCourses.map((c) => (
                      <li
                        key={c.code}
                        className="flex items-center justify-between gap-2 text-xs"
                      >
                        <div className="min-w-0">
                          <span className="font-mono font-semibold text-[var(--primary-soft)]">
                            {c.code}
                          </span>
                          <span className="ml-1.5 truncate text-foreground">
                            {c.title}
                          </span>
                        </div>
                        <span className="shrink-0 text-muted">{c.credits} cr</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href={`/shop?category=textbooks&school=${school.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
              >
                Shop textbooks for this school
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
