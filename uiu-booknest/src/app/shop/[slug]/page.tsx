import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Building2, Truck } from "lucide-react";

import { ComingSoonPanel } from "@/components/shared/page-shell";
import { PriceTag } from "@/components/shared/price-tag";
import { StockBadge } from "@/components/shared/stock-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products, productBySlug } from "@/data/products";
import { categoryBySlug } from "@/data/categories";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title}${product.author ? ` — ${product.author}` : ""}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = productBySlug[slug];
  if (!product) notFound();

  const category = categoryBySlug[product.category];

  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-12 pb-16 md:pt-16">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to shop
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary">{category?.name}</Badge>
              {product.badges?.map((b) => (
                <Badge key={b} variant="default">
                  {b}
                </Badge>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
              {product.title}
            </h1>
            {product.author && (
              <p className="mt-2 text-base text-muted">
                by{" "}
                <span className="text-foreground">{product.author}</span>
                {product.publisher && (
                  <span className="text-muted">
                    {" "}
                    · {product.publisher}
                  </span>
                )}
                {product.edition && (
                  <span className="text-muted"> · {product.edition}</span>
                )}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <PriceTag
                price={product.priceBDT}
                originalPrice={product.originalPriceBDT}
                size="lg"
              />
              <StockBadge inStock={product.inStock} count={product.stockCount} />
            </div>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {product.description}
            </p>

            {product.forCourses && product.forCourses.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-muted">
                  For UIU courses:
                </span>
                {product.forCourses.map((c) => (
                  <span
                    key={c}
                    className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2 py-1 font-mono text-xs text-[var(--primary-soft)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="xl" disabled={!product.inStock}>
                <BookOpen className="size-4" />
                {product.inStock ? "Add to Cart" : "Notify when Restocked"}
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/cart">Go to Cart</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <Building2 className="size-5 text-[var(--primary)]" />
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Free Pickup at UIU
                </p>
                <p className="mt-1 text-xs text-muted">
                  Same-day on orders before 2 PM. Bring your Student ID.
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <Truck className="size-5 text-[var(--primary)]" />
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Pathao / RedX · ৳60
                </p>
                <p className="mt-1 text-xs text-muted">
                  Tracked delivery across Dhaka. COD available.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <ComingSoonPanel
            iterationLabel="Phase 2 · Detail page polish"
            features={[
              { label: "Image gallery with zoom and 360° spin for hardcovers", status: "next" },
              { label: "Customer reviews from verified UIU students", status: "planned" },
              { label: "Course-pairing widget — bundle this textbook with related items", status: "planned" },
              { label: "Live stock counter and pickup ETA at UIU Campus Store", status: "planned" },
            ]}
            primaryAction={{ href: "/shop", label: "Back to Shop" }}
          />
        </div>
      </div>
    </div>
  );
}
