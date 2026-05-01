import { cn } from "@/lib/utils";

type StockBadgeProps = {
  inStock: boolean;
  count?: number;
  className?: string;
};

export function StockBadge({ inStock, count, className }: StockBadgeProps) {
  if (!inStock) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-[var(--danger)]/40 bg-[var(--danger)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--danger)]",
          className
        )}
      >
        <span className="size-1.5 rounded-full bg-[var(--danger)]" />
        Out of Stock
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/40 bg-[var(--success)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--success)]",
        className
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--success)] opacity-50" />
        <span className="relative inline-flex size-1.5 rounded-full bg-[var(--success)]" />
      </span>
      In Stock
      {typeof count === "number" && count > 0 && count <= 10 && (
        <span className="ml-1 text-[10px] text-muted">· only {count} left</span>
      )}
    </span>
  );
}
