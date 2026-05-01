"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Sparkles,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const trustPills = [
  { icon: Wallet, label: "BDT Pricing" },
  { icon: BadgeCheck, label: "bKash · Nagad" },
  { icon: Truck, label: "Pathao Delivery" },
  { icon: BookOpen, label: "BOPIS at UIU" },
];

type HeroBook = {
  id: string;
  src: string;
  alt: string;
};

const initialBooks: HeroBook[] = [
  {
    id: "mankiw",
    src: "/books/Screenshot_6.png",
    alt: "Principles of Economics by Mankiw",
  },
  {
    id: "griffiths",
    src: "/books/Screenshot_11.png",
    alt: "Introduction to Quantum Mechanics by Griffiths",
  },
  {
    id: "blyth",
    src: "/books/717C857QTmL.jpg",
    alt: "An Introduction to Quantitative Finance by Stephen Blyth",
  },
];

const slots = [
  { rotate: 2, x: 48, y: 24, zIndex: 30 },
  { rotate: -6, x: -16, y: -8, zIndex: 20 },
  { rotate: 12, x: 128, y: -16, zIndex: 10 },
];

export function Hero() {
  const [order, setOrder] = React.useState<HeroBook[]>(initialBooks);

  const handleBookClick = (slotIndex: number) => {
    setOrder((prev) => {
      const lastIndex = prev.length - 1;
      if (slotIndex === 0) {
        return [...prev.slice(1), prev[0]];
      }
      if (slotIndex === lastIndex) {
        return [prev[lastIndex], ...prev.slice(0, lastIndex)];
      }
      const reordered = [...prev];
      const [picked] = reordered.splice(slotIndex, 1);
      reordered.unshift(picked);
      return reordered;
    });
  };

  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="absolute inset-0 bg-grid-faint opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 size-[680px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232,103,26,0.45) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-page relative grid min-h-[640px] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary-soft)]">
            <Sparkles className="size-3.5" />
            <span>For UIU Students · Spring 2026</span>
            <span aria-hidden className="text-[var(--muted-2)]">
              ·
            </span>
            <span className="text-muted">MGT 3225 E-Business</span>
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            The Smart{" "}
            <span className="text-gradient-brand">Campus Bookstore</span>
            <br />
            for UIU Students
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Curated textbooks, stationery, and exam supplies — picked up at the
            UIU Campus Store or delivered to your dorm via Pathao &amp; RedX.
            Pay with{" "}
            <span className="text-foreground">bKash</span>,{" "}
            <span className="text-foreground">Nagad</span>, or{" "}
            <span className="text-foreground">Cash on Delivery</span>.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="xl" className="group">
              <Link href="/shop">
                Shop Textbooks
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/courses">Browse by Course</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2">
            {trustPills.map((pill) => (
              <span
                key={pill.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-strong)] bg-[var(--surface)]/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
              >
                <pill.icon className="size-3.5 text-[var(--primary)]" />
                {pill.label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-6 border-t border-[var(--border)] pt-6">
            <div>
              <div className="font-serif text-2xl text-foreground">
                12,500<span className="text-[var(--primary)]">+</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted">
                UIU Students Served
              </div>
            </div>
            <div className="h-10 w-px bg-[var(--border)]" />
            <div>
              <div className="font-serif text-2xl text-foreground">
                4 <span className="text-muted text-base">Schools</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted">
                Across UIU
              </div>
            </div>
            <div className="hidden h-10 w-px bg-[var(--border)] sm:block" />
            <div className="hidden sm:block">
              <div className="font-serif text-2xl text-foreground">
                ৳0 <span className="text-muted text-base">Pickup</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-muted">
                BOPIS at Campus
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative h-[480px] w-full lg:h-[560px]"
        >
          <div
            className="absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/15 blur-3xl lg:size-[520px]"
            aria-hidden
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-[420px] w-[300px] lg:h-[480px] lg:w-[340px]">
              {order.map((book, slotIndex) => {
                const slot = slots[slotIndex];
                return (
                  <motion.button
                    key={book.id}
                    type="button"
                    aria-label={`Bring ${book.alt} to the front`}
                    onClick={() => handleBookClick(slotIndex)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: slot.y,
                      x: slot.x,
                      rotate: slot.rotate,
                      zIndex: slot.zIndex,
                    }}
                    whileHover={{
                      x: slot.x * 0.4,
                      y: slot.y * 0.4,
                      rotate: slot.rotate * 0.3,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 26,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 cursor-pointer rounded-lg p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    style={{ zIndex: slot.zIndex }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface-2)] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7),0_15px_40px_-15px_rgba(232,103,26,0.35)]">
                      <Image
                        src={book.src}
                        alt={book.alt}
                        fill
                        sizes="(max-width: 1024px) 300px, 340px"
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="pointer-events-none absolute bottom-6 left-2 z-40 flex items-center gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/85 p-3 backdrop-blur-md sm:left-6"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--success)]/15">
              <span className="size-2.5 rounded-full bg-[var(--success)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                238 books in stock
              </div>
              <div className="text-xs text-muted">
                Same-day pickup at UIU Campus
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
            className="pointer-events-none absolute right-2 top-8 z-40 flex items-center gap-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)]/85 p-3 backdrop-blur-md sm:right-6"
          >
            <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--primary)]/15">
              <Wallet className="size-4 text-[var(--primary)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Pay with bKash
              </div>
              <div className="text-xs text-muted">Instant. No fees.</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />
    </section>
  );
}
