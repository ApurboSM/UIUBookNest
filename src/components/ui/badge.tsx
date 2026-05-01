import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border-strong)] bg-[var(--surface-2)] text-foreground",
        primary:
          "border-[var(--primary)]/40 bg-[var(--primary)]/10 text-[var(--primary-soft)]",
        success:
          "border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]",
        danger:
          "border-[var(--danger)]/40 bg-[var(--danger)]/10 text-[var(--danger)]",
        outline: "border-[var(--border-strong)] bg-transparent text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
