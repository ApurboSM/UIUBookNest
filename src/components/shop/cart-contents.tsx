"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  Wallet,
} from "lucide-react";

import { ProductCard } from "@/components/shop/product-card";
import {
  BkashMark,
  CodMark,
  NagadMark,
  SslCommerzMark,
} from "@/components/icons/payment-marks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/lib/use-hydrated";
import { formatBDT } from "@/lib/format";
import { products, getFeaturedProducts } from "@/data/products";
import { useCartStore } from "@/store/cart";

const productById = Object.fromEntries(products.map((p) => [p.id, p]));

const reassurances = [
  {
    icon: Building2,
    title: "Free Campus Pickup",
    body: "Collect from the UIU Campus Store, Block A — usually same day.",
  },
  {
    icon: Truck,
    title: "Pathao & RedX Delivery",
    body: "Flat ৳60 across Dhaka with live order tracking.",
  },
  {
    icon: Wallet,
    title: "bKash · Nagad · COD",
    body: "Pay the way you already do every day.",
  },
];

export function CartContents() {
  const hydrated = useHydrated();
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);

  const suggestions = React.useMemo(() => getFeaturedProducts(4), []);

  if (!hydrated) {
    return <CartSkeleton />;
  }

  const lineItems = items
    .map((i) => {
      const product = productById[i.productId];
      if (!product) return null;
      return { ...i, product };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = lineItems.reduce(
    (sum, l) => sum + l.product.priceBDT * l.quantity,
    0
  );
  const itemCount = lineItems.reduce((sum, l) => sum + l.quantity, 0);

  if (lineItems.length === 0) {
    return (
      <>
        <div className="mb-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-8 py-16 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
            <ShoppingBag className="size-7" />
          </div>
          <h2 className="mt-6 font-serif text-2xl tracking-tight md:text-3xl">
            Your cart is empty
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted">
            Browse the shop to add your first textbook. You can pay with bKash,
            Nagad, or Cash on Delivery at checkout.
          </p>
          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/shop">Start Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Browse by Course</Link>
            </Button>
          </div>
        </div>

        <div className="mb-16 grid gap-4 sm:grid-cols-3">
          {reassurances.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                <r.icon className="size-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-foreground">{r.title}</p>
              <p className="mt-1 text-xs text-muted">{r.body}</p>
            </div>
          ))}
        </div>

        <section>
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
                Featured Textbooks
              </p>
              <h2 className="mt-1 font-serif text-2xl tracking-tight md:text-3xl">
                Popular with UIU students
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary-soft)] transition-colors hover:text-[var(--primary)]"
            >
              See all textbooks
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 text-xs uppercase tracking-wider text-muted">
          <span>{itemCount} {itemCount === 1 ? "item" : "items"} in cart</span>
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1 text-muted transition-colors hover:text-[var(--danger)]"
          >
            <Trash2 className="size-3.5" />
            Clear cart
          </button>
        </div>

        {lineItems.map((line) => (
          <article
            key={line.productId}
            className="grid grid-cols-[80px_1fr_auto] gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:grid-cols-[100px_1fr_auto]"
          >
            <Link
              href={`/shop/${line.product.slug}`}
              className="relative aspect-[3/4] overflow-hidden rounded-md border border-[var(--border)] bg-[var(--surface-2)]"
            >
              <Image
                src={line.product.image}
                alt={line.product.imageAlt}
                fill
                sizes="100px"
                className="object-cover"
              />
            </Link>

            <div className="flex min-w-0 flex-col">
              <Link
                href={`/shop/${line.product.slug}`}
                className="line-clamp-2 text-sm font-medium text-foreground transition-colors hover:text-[var(--primary-soft)]"
              >
                {line.product.title}
              </Link>
              {line.product.author && (
                <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                  {line.product.author}
                </p>
              )}
              <p className="mt-1 text-sm font-semibold text-foreground">
                {formatBDT(line.product.priceBDT)}
              </p>

              <div className="mt-3 flex items-center gap-3">
                <div className="inline-flex items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.productId, line.quantity - 1)}
                    className="flex size-8 items-center justify-center text-muted transition-colors hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-semibold text-foreground">
                    {line.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(line.productId, line.quantity + 1)}
                    className="flex size-8 items-center justify-center text-muted transition-colors hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(line.productId)}
                  className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-[var(--danger)]"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="font-mono text-sm font-semibold text-foreground">
                {formatBDT(line.product.priceBDT * line.quantity)}
              </p>
            </div>
          </article>
        ))}

        <div className="pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowRight className="size-4 rotate-180" />
            Keep shopping
          </Link>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="font-serif text-xl tracking-tight">Order Summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</dt>
              <dd className="font-mono text-foreground">{formatBDT(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd className="font-mono text-muted">Calculated at checkout</dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-[var(--border)] pt-3 text-base">
              <dt className="font-semibold text-foreground">Estimated total</dt>
              <dd className="font-mono text-lg font-semibold text-foreground">
                {formatBDT(subtotal)}
              </dd>
            </div>
          </dl>

          <Button asChild size="lg" className="mt-6 w-full">
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="size-4" />
            </Link>
          </Button>

          <div className="mt-5 space-y-2">
            <p className="text-center text-[10px] uppercase tracking-wider text-muted">
              We accept
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <BkashMark size="sm" />
              <NagadMark size="sm" />
              <SslCommerzMark size="sm" />
              <CodMark size="sm" />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-5 text-xs text-muted">
          <div className="flex items-center gap-2 text-foreground">
            <Building2 className="size-4 text-[var(--primary)]" />
            <span className="font-semibold">Free pickup at UIU Campus</span>
          </div>
          <p className="mt-2 leading-relaxed">
            Choose pickup at checkout to skip the ৳60 delivery fee. Same-day on
            orders placed before 2 PM.
          </p>
        </div>
      </aside>
    </div>
  );
}

function CartSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-[100px_1fr] gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <Skeleton className="aspect-[3/4]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="mt-3 h-8 w-32" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="h-72 rounded-2xl" />
    </div>
  );
}
