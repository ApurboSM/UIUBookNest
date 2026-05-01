import Link from "next/link";
import { ArrowUpRight, BookOpen, ClipboardList, PenTool, Shirt } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

const iconMap = {
  book: BookOpen,
  pencil: PenTool,
  clipboard: ClipboardList,
  shirt: Shirt,
};

export function CategoryGrid() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Shop by Category"
            title={
              <>
                Everything a UIU student needs,{" "}
                <span className="text-gradient-brand">in one place</span>
              </>
            }
            description="Four curated aisles built around the trimester rhythm — textbooks for class, stationery for the desk, supplies for finals, and merch for campus pride."
          />
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
          >
            View full catalogue
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const count = products.filter((p) => p.category === cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:bg-[var(--surface-2)]"
              >
                <div
                  className="absolute -right-12 -top-12 size-40 rounded-full bg-[var(--primary)]/0 blur-3xl transition-all duration-500 group-hover:bg-[var(--primary)]/15"
                  aria-hidden
                />
                <div className="relative flex size-12 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--primary)]/20">
                  <Icon className="size-6" />
                </div>
                <h3 className="relative mt-6 font-serif text-2xl leading-tight tracking-tight text-foreground">
                  {cat.name}
                </h3>
                <p className="relative mt-1 text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                  {cat.tagline}
                </p>
                <p className="relative mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {cat.description}
                </p>
                <div className="relative mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="text-xs text-muted">
                    <span className="text-foreground font-semibold">{count}</span> items
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors group-hover:text-[var(--primary-soft)]">
                    Shop now
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
