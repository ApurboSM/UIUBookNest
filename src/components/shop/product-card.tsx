import Image from "next/image";
import Link from "next/link";

import { PriceTag } from "@/components/shared/price-tag";
import { StockBadge } from "@/components/shared/stock-badge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)]/50 hover:shadow-[0_20px_60px_-25px_rgba(232,103,26,0.45)]",
        className
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--surface-2)]">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            {product.badges?.slice(0, 1).map((b) => (
              <Badge key={b} variant="primary" className="backdrop-blur">
                {b}
              </Badge>
            ))}
          </div>
          <StockBadge
            inStock={product.inStock}
            className="backdrop-blur bg-black/40"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 text-[15px] font-medium leading-snug text-foreground transition-colors group-hover:text-[var(--primary-soft)]">
          {product.title}
        </h3>
        {product.author && (
          <p className="line-clamp-1 text-xs text-muted">{product.author}</p>
        )}
        <div className="mt-auto flex flex-col gap-1.5 pt-3">
          <PriceTag
            price={product.priceBDT}
            originalPrice={product.originalPriceBDT}
            size="md"
          />
          {product.inStock &&
            typeof product.stockCount === "number" &&
            product.stockCount > 0 &&
            product.stockCount <= 10 && (
              <span className="text-[11px] text-[var(--primary-soft)]">
                Only {product.stockCount} left in stock
              </span>
            )}
        </div>
      </div>
    </Link>
  );
}
