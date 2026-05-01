import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-black font-semibold hover:bg-[var(--primary-hover)] hover:shadow-[0_8px_30px_-8px_rgba(232,103,26,0.55)] focus-visible:ring-[var(--primary)] active:translate-y-px",
        secondary:
          "bg-[var(--surface-2)] text-foreground border border-[var(--border-strong)] hover:bg-[var(--surface-3)] hover:border-[var(--primary)]/40 focus-visible:ring-[var(--primary)]",
        outline:
          "border border-[var(--border-strong)] bg-transparent text-foreground hover:bg-[var(--surface)] hover:border-[var(--primary)]/60 focus-visible:ring-[var(--primary)]",
        ghost:
          "bg-transparent text-foreground hover:bg-[var(--surface-2)] focus-visible:ring-[var(--primary)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline hover:text-[var(--primary-hover)]",
        destructive:
          "bg-[var(--danger)] text-white hover:bg-[var(--danger)]/90 focus-visible:ring-[var(--danger)]",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
