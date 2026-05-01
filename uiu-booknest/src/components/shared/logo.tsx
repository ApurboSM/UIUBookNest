import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { px: 28, text: "text-lg" },
  md: { px: 36, text: "text-xl" },
  lg: { px: 56, text: "text-3xl" },
};

export function Logo({
  href = "/",
  size = "md",
  showWordmark = true,
  className,
}: LogoProps) {
  const s = sizeMap[size];
  const content = (
    <span className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span className="relative shrink-0 inline-flex items-center justify-center rounded-lg bg-black ring-1 ring-[var(--border-strong)] p-1 transition-shadow group-hover:ring-[var(--primary)]/60">
        <Image
          src="/logo.png"
          alt="UIUBookNest"
          width={s.px}
          height={s.px}
          priority
          className="object-contain"
        />
      </span>
      {showWordmark && (
        <span className={cn("font-serif font-semibold tracking-tight", s.text)}>
          UIU<span className="text-[var(--primary)]">Book</span>Nest
        </span>
      )}
    </span>
  );

  if (!href) return content;
  return (
    <Link
      href={href}
      aria-label="UIUBookNest home"
      className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
    >
      {content}
    </Link>
  );
}
