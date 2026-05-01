import Image from "next/image";

import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const heightMap = { sm: 18, md: 26, lg: 36 } as const;
const padMap = {
  sm: "px-2 py-1",
  md: "px-2.5 py-1.5",
  lg: "px-3 py-2",
} as const;

type BrandKey = "bkash" | "nagad" | "sslcommerz";

const brandConfig: Record<
  BrandKey,
  { src: string; alt: string; aspect: number; tint: string }
> = {
  bkash: {
    src: "/assets/payments/bkash.png",
    alt: "bKash",
    aspect: 2.0,
    tint: "shadow-[0_4px_12px_-6px_rgba(226,19,110,0.45)]",
  },
  nagad: {
    src: "/assets/payments/nagad.png",
    alt: "Nagad",
    aspect: 2.56,
    tint: "shadow-[0_4px_12px_-6px_rgba(235,84,23,0.45)]",
  },
  sslcommerz: {
    src: "/assets/payments/sslcommerz.png",
    alt: "SSLCommerz",
    aspect: 3.66,
    tint: "shadow-[0_4px_12px_-6px_rgba(30,64,175,0.45)]",
  },
};

function BrandImageMark({
  brand,
  size = "md",
  className,
}: MarkProps & { brand: BrandKey }) {
  const cfg = brandConfig[brand];
  const h = heightMap[size];
  const w = Math.round(h * cfg.aspect);
  return (
    <span
      role="img"
      aria-label={cfg.alt}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-black/5",
        padMap[size],
        cfg.tint,
        className
      )}
    >
      <Image
        src={cfg.src}
        alt={cfg.alt}
        width={w}
        height={h}
        className="block object-contain"
        style={{ width: w, height: h }}
        unoptimized
      />
    </span>
  );
}

export function BkashMark(props: MarkProps) {
  return <BrandImageMark brand="bkash" {...props} />;
}

export function NagadMark(props: MarkProps) {
  return <BrandImageMark brand="nagad" {...props} />;
}

export function SslCommerzMark(props: MarkProps) {
  return <BrandImageMark brand="sslcommerz" {...props} />;
}

export function CodMark({ className, size = "md" }: MarkProps) {
  const h = heightMap[size];
  return (
    <span
      role="img"
      aria-label="Cash on Delivery"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] font-bold text-foreground",
        padMap[size],
        size === "sm" ? "text-[11px]" : size === "md" ? "text-xs" : "text-sm",
        className
      )}
      style={{ height: h + (size === "sm" ? 8 : size === "md" ? 12 : 16) }}
    >
      <svg
        viewBox="0 0 24 24"
        className={
          size === "sm"
            ? "size-3"
            : size === "md"
              ? "size-3.5"
              : "size-4"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M6 9v0M18 15v0" />
      </svg>
      <span className="tracking-tight">COD</span>
    </span>
  );
}
