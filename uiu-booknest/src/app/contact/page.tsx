import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Contact UIUBookNest",
  description:
    "Reach the UIUBookNest team — phone, email, and the UIU Campus Store address with hours.",
};

const channels = [
  {
    icon: MapPin,
    title: "UIU Campus Store",
    body: "Ground Floor, Block A · United International University, United City, Madani Avenue, Badda, Dhaka 1212",
    cta: "Get directions",
    href: "https://maps.google.com/?q=United+International+University+Dhaka",
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    body: "+880 1700-000000",
    cta: "Tap to call",
    href: "tel:+8801700000000",
  },
  {
    icon: Mail,
    title: "Email Support",
    body: "support@uiubooknest.bd",
    cta: "Send an email",
    href: "mailto:support@uiubooknest.bd",
  },
  {
    icon: Clock,
    title: "Hours",
    body: "Sunday – Thursday · 9:00 AM – 6:30 PM",
    cta: "Friday & Saturday closed",
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title={
        <>
          We&rsquo;re on campus &mdash;{" "}
          <span className="text-gradient-brand">come say hi</span>
        </>
      }
      description="Whether you've got a stock question, want to confirm a course textbook, or need help with a return — here's how to reach the UIUBookNest team."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {channels.map((c) => (
            <div
              key={c.title}
              className="flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                <c.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {c.body}
              </p>
              {c.href ? (
                <a
                  href={c.href}
                  className="mt-4 text-sm font-medium text-[var(--primary-soft)] hover:text-[var(--primary)]"
                >
                  {c.cta} →
                </a>
              ) : (
                <p className="mt-4 text-xs uppercase tracking-wider text-muted">
                  {c.cta}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-8">
          <h2 className="font-serif text-2xl tracking-tight md:text-3xl">
            Send us a message
          </h2>
          <p className="mt-2 text-sm text-muted">
            Form submission isn&rsquo;t wired in this iteration &mdash; but the layout
            below is the exact one that goes live in Phase 4.
          </p>
          <ContactForm />
        </div>
      </div>
    </PageShell>
  );
}
