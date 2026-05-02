"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/lib/use-hydrated";
import { useCartCount } from "@/store/cart";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Exported as a thin wrapper that defers the useSearchParams consumer inside Suspense
export function Header() {
  return (
    <React.Suspense fallback={<HeaderShell />}>
      <HeaderInner />
    </React.Suspense>
  );
}

// Fallback shell rendered during SSR / Suspense – no useSearchParams
function HeaderShell() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-transparent bg-background transition-all duration-300">
      <div className="container-page flex h-16 items-center gap-4 md:h-18">
        <Logo />
      </div>
    </header>
  );
}

function HeaderInner() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(initialQuery);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const [prevQuery, setPrevQuery] = React.useState(initialQuery);
  const hydrated = useHydrated();
  const cartCount = useCartCount();

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  if (initialQuery !== prevQuery) {
    setPrevQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  const submitSearch = (raw: string) => {
    const q = raw.trim();
    if (!q) {
      router.push("/shop");
    } else {
      router.push(`/shop?q=${encodeURIComponent(q)}`);
    }
    setSearchOpen(false);
  };

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[var(--border)] bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-black/65"
          : "border-transparent bg-background"
      )}
    >
      <div className="container-page flex h-16 items-center gap-4 md:h-18">
        <Logo />

        <nav className="ml-8 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[var(--primary)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 md:gap-2">
          <div className="hidden md:block">
            {searchOpen ? (
              <form
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  submitSearch(searchQuery);
                }}
                className="flex items-center gap-1"
              >
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <Input
                    autoFocus
                    name="q"
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search textbooks, authors, course codes…"
                    className="h-9 w-[280px] pl-9 lg:w-[360px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        submitSearch(searchQuery);
                      } else if (e.key === "Escape") {
                        setSearchOpen(false);
                        setSearchQuery(initialQuery);
                      }
                    }}
                  />
                </div>
                <button type="submit" className="sr-only" aria-hidden tabIndex={-1}>
                  Search
                </button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery(initialQuery);
                  }}
                  aria-label="Close search"
                >
                  <X className="size-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <Search className="size-5" />
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="md:hidden"
            aria-label="Search"
          >
            <Link href="/shop">
              <Search className="size-5" />
            </Link>
          </Button>

          <Button
            variant="secondary"
            asChild
            className="hidden h-10 gap-2 md:inline-flex"
          >
            <Link href="/cart" aria-label="View cart">
              <ShoppingBag className="size-4" />
              <span className="text-sm font-medium">Cart</span>
              <span
                className={cn(
                  "ml-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full px-1.5 py-px text-[10px] font-bold transition-colors",
                  hydrated && cartCount > 0
                    ? "bg-[var(--primary)] text-black"
                    : "bg-[var(--surface-3)] text-muted"
                )}
              >
                {hydrated ? cartCount : 0}
              </span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative md:hidden"
            aria-label="Cart"
          >
            <Link href="/cart">
              <ShoppingBag className="size-5" />
              {hydrated && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex size-4 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-black">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[380px]">
              <div className="flex h-full flex-col">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "rounded-md px-3 py-3 text-base font-medium transition-colors",
                          active
                            ? "bg-[var(--surface-2)] text-[var(--primary-soft)]"
                            : "text-foreground hover:bg-[var(--surface-2)]"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-6 space-y-2 border-t border-[var(--border)] pt-6">
                  <Button asChild variant="primary" className="w-full">
                    <Link href="/shop">Shop Textbooks</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </div>
                <div className="mt-auto pt-6 text-xs text-muted">
                  <p>United International University</p>
                  <p>Madani Avenue, Dhaka 1212</p>
                  <p className="mt-2 text-[var(--primary-soft)]">
                    +880 1700-000000
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
