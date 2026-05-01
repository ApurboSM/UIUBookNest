import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";

type PriceTagProps = {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { main: "text-base", original: "text-xs" },
  md: { main: "text-lg", original: "text-sm" },
  lg: { main: "text-2xl", original: "text-base" },
};

export function PriceTag({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceTagProps) {
  const s = sizeMap[size];
  const hasDiscount =
    typeof originalPrice === "number" && originalPrice > price;
  const pctOff = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={cn("inline-flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold text-foreground", s.main)}>
        {formatBDT(price)}
      </span>
      {hasDiscount && (
        <>
          <span
            className={cn(
              "text-[var(--muted-2)] line-through",
              s.original
            )}
          >
            {formatBDT(originalPrice)}
          </span>
          <span
            className={cn(
              "rounded-full bg-[var(--primary)]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--primary-soft)]"
            )}
          >
            -{pctOff}%
          </span>
        </>
      )}
    </div>
  );
}
