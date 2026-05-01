import type { Metadata } from "next";

import { ProductCard } from "@/components/shop/product-card";
import { PageShell, ComingSoonPanel } from "@/components/shared/page-shell";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop — Textbooks, Stationery & UIU Merchandise",
  description:
    "Browse the full UIUBookNest catalogue. Filter by category, search by title or course code, and add to cart for campus pickup or Pathao/RedX delivery.",
};

export default function ShopPage() {
  const featured = getFeaturedProducts(4);

  return (
    <PageShell
      eyebrow="Shop · 23 SKUs"
      title={
        <>
          The full UIU{" "}
          <span className="text-gradient-brand">campus catalogue</span>
        </>
      }
      description="A growing list of textbooks, stationery, exam supplies, and UIU merchandise — all priced in BDT, all eligible for campus pickup or Pathao / RedX delivery."
    >
      <div className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <div
            key={c.slug}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
              {c.name}
            </p>
            <p className="mt-1 text-sm text-muted">{c.tagline}</p>
          </div>
        ))}
      </div>

      <ComingSoonPanel
        iterationLabel="Phase 2 · Full Catalogue"
        primaryAction={{ href: "/", label: "Back to Home" }}
        secondaryAction={{ href: "/courses", label: "Browse Courses" }}
        features={[
          { label: "Category filter — Textbooks · Stationery · Exam Supplies · UIU Merchandise", status: "next" },
          { label: "Header search wired across title, author, ISBN, and course code", status: "next" },
          { label: "Sort by price, popularity, and newest restock", status: "next" },
          { label: "Filter by school: Science & Engineering, Business & Economics, Humanities & Social, Life Sciences", status: "planned" },
          { label: "Pagination and stock-aware empty states", status: "planned" },
        ]}
      />

      <div className="mt-16">
        <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
          Available now — preview
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          A small preview of textbooks already in the catalogue. Click any card
          to see the planned product detail layout.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}
