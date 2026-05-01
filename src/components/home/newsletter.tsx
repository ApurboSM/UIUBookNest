"use client";

import * as React from "react";
import { ArrowRight, Bell, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-[#161106] via-[#1a1208] to-[#0d0d0d] p-10 md:p-16">
          <div
            className="absolute -right-32 -top-32 size-[420px] rounded-full bg-[var(--primary)]/15 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -bottom-40 -left-32 size-[420px] rounded-full bg-[var(--primary)]/10 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium text-[var(--primary-soft)]">
                <Bell className="size-3.5" />
                Trimester restock alerts
              </div>
              <h2 className="mt-5 font-serif text-3xl leading-tight tracking-tight text-balance md:text-5xl">
                Get notified the moment your{" "}
                <span className="text-gradient-brand">course textbook</span>{" "}
                is back in stock.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                Drop your email &mdash; we&rsquo;ll send a single, polite notification when
                a textbook on your watchlist is restocked. No spam, no daily
                blasts. Cancel any time.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSubmitted(true);
              }}
              className="flex flex-col gap-3"
            >
              <label
                htmlFor="newsletter-email"
                className="text-xs font-medium uppercase tracking-wider text-muted"
              >
                Your UIU email
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="firstname.lastname@bscse.uiu.ac.bd"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitted}
                  className="h-12 flex-1"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="size-4" />
                      Subscribed
                    </>
                  ) : (
                    <>
                      Notify Me
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted">
                We never share your email. Privacy notice references the{" "}
                <span className="text-foreground">
                  Consumer Rights Protection Act 2009
                </span>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
