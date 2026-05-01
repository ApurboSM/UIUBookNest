import Link from "next/link";
import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { Logo } from "@/components/shared/logo";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
  </svg>
);

const shopLinks = [
  { href: "/shop?category=textbooks", label: "Textbooks" },
  { href: "/shop?category=stationery", label: "Stationery" },
  { href: "/shop?category=exam-supplies", label: "Exam Supplies" },
  { href: "/shop?category=uiu-merchandise", label: "UIU Merchandise" },
];

const helpLinks = [
  { href: "/return-policy", label: "Return Policy" },
  { href: "/privacy-notice", label: "Privacy Notice" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About BookNest" },
];

const courseLinks = [
  { href: "/courses#science-engineering", label: "Science & Engineering" },
  { href: "/courses#business-economics", label: "Business & Economics" },
  { href: "/courses#humanities-social", label: "Humanities & Social Sciences" },
  { href: "/courses#life-sciences", label: "Life Sciences" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--border)] bg-[#0a0a0a]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />

      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              The smart campus bookstore for United International University —
              curated textbooks, everyday stationery, and UIU merchandise with
              campus pickup or city-wide delivery.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: FacebookIcon, href: "#", label: "Facebook" },
                { Icon: InstagramIcon, href: "#", label: "Instagram" },
                { Icon: TwitterIcon, href: "#", label: "Twitter / X" },
                { Icon: YoutubeIcon, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-muted transition-colors hover:border-[var(--primary)]/60 hover:text-[var(--primary-soft)]"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-xs text-muted">
              <ShieldCheck className="size-4 text-[var(--primary)]" />
              <span>
                Trusted Bangladeshi e-commerce —{" "}
                <span className="text-foreground">DCOG-2021 compliant</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-[var(--primary-soft)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              By School
            </h4>
            <ul className="mt-4 space-y-3">
              {courseLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-[var(--primary-soft)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-sm font-semibold uppercase tracking-wider text-foreground">
              Help
            </h4>
            <ul className="mt-4 space-y-3">
              {helpLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-[var(--primary-soft)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Reach Us
            </h4>
            <address className="mt-4 space-y-3 text-sm not-italic text-muted">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                <span>
                  United International University
                  <br />
                  United City, Madani Avenue
                  <br />
                  Badda, Dhaka 1212, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[var(--primary)]" />
                <a
                  href="tel:+8801700000000"
                  className="transition-colors hover:text-foreground"
                >
                  +880 1700-000000
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[var(--primary)]" />
                <a
                  href="mailto:support@uiubooknest.bd"
                  className="transition-colors hover:text-foreground"
                >
                  support@uiubooknest.bd
                </a>
              </div>
            </address>

            <div className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary-soft)]">
                Campus Store Hours
              </p>
              <p className="mt-2 text-sm text-foreground">
                Sun – Thu · 9:00 AM – 6:30 PM
              </p>
              <p className="text-xs text-muted">
                Located at UIU Ground Floor, Block A
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-page flex flex-col gap-4 py-6 text-xs text-muted lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 py-1">
              <ShieldCheck className="size-3.5 text-[var(--primary)]" />
              <span>
                <span className="text-foreground">DBID:</span>{" "}
                [Registration Pending — e-CAB 2024]
              </span>
            </span>
            <span>
              Complies with{" "}
              <span className="text-foreground">
                Bangladesh Digital Commerce Operations Guidelines 2021 (DCOG-2021)
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© 2026 UIUBookNest</span>
            <span aria-hidden>·</span>
            <span>MGT 3225 E-Business · Spring 2026</span>
            <span aria-hidden>·</span>
            <span>Group 07 Section B</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
