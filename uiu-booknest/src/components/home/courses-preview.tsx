import Link from "next/link";
import { ArrowUpRight, ExternalLink, GraduationCap } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { schools, ELMS_SPRING_2026 } from "@/data/courses";

export function CoursesPreview() {
  return (
    <section className="relative border-t border-[var(--border)] bg-[#0c0c0c] py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Browse by Course"
            title={
              <>
                Find textbooks for{" "}
                <span className="text-gradient-brand">your school</span>
              </>
            }
            description="Linked directly to UIU's official eLMS so you always land on the right Spring 2026 course catalogue."
          />
          <Link
            href={ELMS_SPRING_2026}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
          >
            Open UIU eLMS
            <ExternalLink className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {schools.map((school) => {
            const sampleCourses = school.departments
              .flatMap((d) => d.sampleCourses.map((c) => ({ ...c, dept: d.code })))
              .slice(0, 4);
            return (
              <article
                key={school.slug}
                id={school.slug}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:border-[var(--primary)]/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                      <GraduationCap className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                        School
                      </p>
                      <h3 className="font-serif text-xl leading-tight text-foreground">
                        {school.shortName}
                      </h3>
                    </div>
                  </div>
                  <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {school.departments.length} dept{school.departments.length > 1 ? "s" : ""}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  {school.description}
                </p>

                <div className="mt-5 grid gap-2">
                  {sampleCourses.map((c) => (
                    <div
                      key={`${c.dept}-${c.code}`}
                      className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[#0d0d0d] px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <span className="font-mono text-xs font-semibold text-[var(--primary-soft)]">
                          {c.code}
                        </span>
                        <span className="ml-2 truncate text-sm text-foreground">
                          {c.title}
                        </span>
                      </div>
                      <span className="ml-3 shrink-0 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-2 py-0.5 text-[10px] text-muted">
                        {c.credits} cr
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <Link
                    href={school.elmsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-[var(--primary-soft)]"
                  >
                    View on UIU eLMS
                    <ExternalLink className="size-3.5" />
                  </Link>
                  <Link
                    href={`/shop?category=textbooks&school=${school.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
                  >
                    Shop textbooks
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
