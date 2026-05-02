import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FilterX, Frown, Search } from "lucide-react";

import { ProductCard } from "@/components/shop/product-card";
import { ShopSearchBar } from "@/components/shop/shop-search-bar";
import { PageShell } from "@/components/shared/page-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, categoryBySlug } from "@/data/categories";
import { products } from "@/data/products";
import { searchProducts } from "@/lib/search";
import type { CategorySlug } from "@/types";

export const metadata: Metadata = {
  title: "Shop — Textbooks, Stationery & UIU Merchandise",
  description:
    "Browse the full UIUBookNest catalogue. Filter by category, search by title or course code, and add to cart for campus pickup or Pathao/RedX delivery.",
};

type ShopSearchParams = {
  q?: string;
  category?: string;
};

const validCategorySlugs: CategorySlug[] = [
  "textbooks",
  "stationery",
  "exam-supplies",
  "uiu-merchandise",
];

function isValidCategory(value?: string): value is CategorySlug {
  return !!value && (validCategorySlugs as string[]).includes(value);
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<ShopSearchParams>;
}) {
  const params = await searchParams;
  const rawQuery = (params.q ?? "").trim();
  const activeCategory = isValidCategory(params.category)
    ? params.category
    : undefined;

  const isSearching = rawQuery.length > 0;
  const isFiltering = !!activeCategory && !isSearching;

  const categoryCounts = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.slug).length,
  }));

  let searchResults = isSearching ? searchProducts(rawQuery) : [];
  if (isSearching && activeCategory) {
    searchResults = searchResults.filter(
      (r) => r.product.category === activeCategory,
    );
  }

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products;

  const groupedByCategory = categories.map((c) => ({
    category: c,
    items: products.filter((p) => p.category === c.slug),
  }));

  const eyebrow = isSearching
    ? `Search results · "${rawQuery}"`
    : isFiltering
      ? `Browse · ${categoryBySlug[activeCategory!].name}`
      : `Shop · ${products.length} SKUs`;

  const heading = isSearching ? (
    <>
      Results for{" "}
      <span className="text-gradient-brand">&ldquo;{rawQuery}&rdquo;</span>
    </>
  ) : isFiltering ? (
    <>
      <span className="text-gradient-brand">
        {categoryBySlug[activeCategory!].name}
      </span>{" "}
      catalogue
    </>
  ) : (
    <>
      The full UIU{" "}
      <span className="text-gradient-brand">campus catalogue</span>
    </>
  );

  const description = isSearching
    ? `${searchResults.length} ${
        searchResults.length === 1 ? "match" : "matches"
      } across textbooks, stationery, exam supplies, and UIU merchandise.`
    : isFiltering
      ? categoryBySlug[activeCategory!].description
      : "A growing list of textbooks, stationery, exam supplies, and UIU merchandise — all priced in BDT, all eligible for campus pickup or Pathao / RedX delivery.";

  return (
    <PageShell eyebrow={eyebrow} title={heading} description={description}>
      <div className="mb-8 flex flex-wrap items-center gap-3 border-b border-[var(--border)] pb-6">
        {categoryCounts.map((c) => {
          const isActive = activeCategory === c.slug;
          const href = isSearching
            ? `/shop?q=${encodeURIComponent(rawQuery)}&category=${c.slug}`
            : `/shop?category=${c.slug}`;
          return (
            <Link
              key={c.slug}
              href={isActive ? (isSearching ? `/shop?q=${encodeURIComponent(rawQuery)}` : "/shop") : href}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "border-[var(--primary)] bg-[var(--primary)]/[0.08] text-foreground"
                  : "border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--primary)]/50 hover:bg-[var(--surface-2)]"
              }`}
            >
              <span className="text-foreground">{c.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  isActive
                    ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                    : "bg-[var(--surface-2)] text-muted group-hover:text-[var(--primary-soft)]"
                }`}
              >
                {c.count}
              </span>
            </Link>
          );
        })}
        <ShopSearchBar
          initialQuery={rawQuery}
          initialCategory={activeCategory}
        />
      </div>

      {(isSearching || isFiltering) && (
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted">Active filters:</span>
          {isSearching && (
            <Badge variant="primary">Query: &ldquo;{rawQuery}&rdquo;</Badge>
          )}
          {isFiltering && (
            <Badge variant="primary">
              Category: {categoryBySlug[activeCategory!].name}
            </Badge>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href="/shop">
              <FilterX className="size-3.5" />
              Clear all
            </Link>
          </Button>
        </div>
      )}

      {isSearching ? (
        searchResults.length > 0 ? (
          <div>
            <p className="mb-4 text-sm text-muted">
              Showing{" "}
              <span className="text-foreground">{searchResults.length}</span>{" "}
              {searchResults.length === 1 ? "product" : "products"}
              {activeCategory && (
                <>
                  {" "}
                  in{" "}
                  <span className="text-foreground">
                    {categoryBySlug[activeCategory].name}
                  </span>
                </>
              )}
              , sorted by relevance.
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {searchResults.map(({ product }) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <EmptyState query={rawQuery} />
        )
      ) : isFiltering ? (
        <div>
          <p className="mb-4 text-sm text-muted">
            <span className="text-foreground">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "item" : "items"} in{" "}
            <span className="text-foreground">
              {categoryBySlug[activeCategory!].name}
            </span>
            .
          </p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {groupedByCategory.map(({ category, items }) => (
            <section
              key={category.slug}
              id={category.slug}
              className="scroll-mt-24"
            >
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
      )}
    </PageShell>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-8 py-16 text-center">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
        <Frown className="size-7" />
      </div>
      <h2 className="mt-6 font-serif text-2xl tracking-tight md:text-3xl">
        No results for &ldquo;{query}&rdquo;
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        We couldn&rsquo;t find any matching textbooks, stationery, exam
        supplies, or UIU merchandise. Try a different keyword, an author name,
        or a course code like{" "}
        <span className="text-foreground">CSE 1115</span>.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="primary">
          <Link href="/shop">
            <Search className="size-4" />
            Browse the full catalogue
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/courses">Browse by Course</Link>
        </Button>
      </div>
    </div>
  );
}
