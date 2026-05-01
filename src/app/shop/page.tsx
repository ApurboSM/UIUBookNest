import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/shop/product-card";
import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop — Textbooks, Stationery & UIU Merchandise",
  description:
    "Browse the full UIUBookNest catalogue. Filter by category, search by title or course code, and add to cart for campus pickup or Pathao/RedX delivery.",
};

export default function ShopPage() {
  const categoryCounts = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.slug).length,
  }));

  const groupedByCategory = categories.map((c) => ({
    category: c,
    items: products.filter((p) => p.category === c.slug),
  }));

  return (
    <PageShell
      eyebrow={`Shop · ${products.length} SKUs`}
      title={
        <>
          The full UIU{" "}
          <span className="text-gradient-brand">campus catalogue</span>
        </>
      }
      description="A growing list of textbooks, stationery, exam supplies, and UIU merchandise — all priced in BDT, all eligible for campus pickup or Pathao / RedX delivery."
    >
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {categoryCounts.map((c) => (
          <Link
            key={c.slug}
            href={`#${c.slug}`}
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-sm transition-colors hover:border-[var(--primary)]/50 hover:bg-[var(--surface-2)]"
          >
            <span className="text-foreground">{c.name}</span>
            <span className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[10px] font-semibold text-muted group-hover:text-[var(--primary-soft)]">
              {c.count}
            </span>
          </Link>
        ))}
        <span className="ml-auto inline-flex items-center gap-2 text-xs text-muted">
          <SlidersHorizontal className="size-3.5" />
          Sort by relevance
          <Search className="ml-2 size-3.5" />
          Search
        </span>
      </div>

      <div className="space-y-16">
        {groupedByCategory.map(({ category, items }) => (
          <section key={category.slug} id={category.slug} className="scroll-mt-24">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div>
                <Badge variant="primary" className="mb-2">
                  {category.tagline}
                </Badge>
                <h2 className="font-serif text-2xl tracking-tight text-foreground md:text-3xl">
                  {category.name}
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted">
                  {category.description}
                </p>
              </div>
              <Link
                href={`/shop?category=${category.slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
              >
                View {items.length} {items.length === 1 ? "item" : "items"}
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
