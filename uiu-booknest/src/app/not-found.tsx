import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow"
        aria-hidden
      />
      <div className="container-page relative flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-[var(--primary-soft)]">
          404 · Off the Shelf
        </p>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
          That page is{" "}
          <span className="text-gradient-brand">out of stock</span>
        </h1>
        <p className="mt-5 max-w-lg text-base text-muted">
          The page you're looking for has either moved or never existed. Try the
          shop, or jump back to the homepage to keep browsing.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="size-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">
              <Search className="size-4" />
              Browse the Shop
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
