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
  sm: { boxClass: "size-7", text: "text-lg" },
  md: { boxClass: "size-9", text: "text-xl" },
  lg: { boxClass: "size-14", text: "text-3xl" },
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
      <span
        className={cn(
          "relative shrink-0 inline-flex items-center justify-center overflow-hidden rounded-lg bg-black ring-1 ring-[var(--border-strong)] transition-shadow group-hover:ring-[var(--primary)]/60",
          s.boxClass
        )}
      >
        <Image
          src="/logo.png"
          alt="UIUBookNest"
          fill
          sizes="56px"
          priority
          className="object-cover scale-[1.6]"
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
