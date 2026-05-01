import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/data/products";

export function FeaturedBooks() {
  const featured = getFeaturedProducts(8);
  return (
    <section className="relative border-t border-[var(--border)] bg-[#0c0c0c] py-20 md:py-28">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Featured Textbooks"
            title={
              <>
                Recommended readers for{" "}
                <span className="text-gradient-brand">Spring 2026</span>
              </>
            }
            description="Hand-picked from the syllabi of UIU's most-enrolled courses. Each one is verified in stock and priced in BDT."
          />
          <Button asChild variant="outline" size="lg">
            <Link href="/shop?category=textbooks">
              See all textbooks
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
