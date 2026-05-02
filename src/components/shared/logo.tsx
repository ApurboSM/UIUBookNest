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
  sm: { w: 56, h: 30, text: "text-lg" },
  md: { w: 72, h: 39, text: "text-xl" },
  lg: { w: 110, h: 60, text: "text-3xl" },
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
      <span className="relative shrink-0 inline-flex items-center justify-center">
        <Image
          src="/assets/logo.png"
          alt="UIUBookNest"
          width={s.w}
          height={s.h}
          priority
          className="h-auto w-auto object-contain drop-shadow-[0_0_6px_rgba(232,103,26,0.35)] transition-[filter] group-hover:drop-shadow-[0_0_10px_rgba(232,103,26,0.6)]"
          style={{ maxHeight: s.h, maxWidth: s.w }}
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
