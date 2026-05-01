"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  return (
    <form
      className="mt-6 grid gap-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            Full name
          </label>
          <Input className="mt-2" placeholder="Your name" />
        </div>
        <div>
          <label className="text-xs font-medium uppercase tracking-wider text-muted">
            UIU Student ID
          </label>
          <Input className="mt-2" placeholder="011XXXXXXX" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Email
        </label>
        <Input
          type="email"
          className="mt-2"
          placeholder="firstname.lastname@bscse.uiu.ac.bd"
        />
      </div>
      <div>
        <label className="text-xs font-medium uppercase tracking-wider text-muted">
          Message
        </label>
        <textarea
          rows={5}
          placeholder="How can we help?"
          className="mt-2 flex w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-sm text-foreground placeholder:text-[var(--muted-2)] transition-colors focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
        />
      </div>
      <Button type="submit" size="lg" disabled>
        Send Message (preview)
      </Button>
    </form>
  );
}
