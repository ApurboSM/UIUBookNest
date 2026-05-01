"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock,
  Copy,
  Home,
  IdCard,
  MapPin,
  MessageSquare,
  Phone,
  Printer,
  Truck,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/lib/use-hydrated";
import { formatBDT } from "@/lib/format";
import { useOrderStore } from "@/store/order";
import type { Order, PaymentMethod } from "@/types";

const paymentLabels: Record<PaymentMethod, { label: string; brandClass: string }> = {
  bkash: {
    label: "bKash",
    brandClass: "text-[#E2136E] bg-[#E2136E]/10 border-[#E2136E]/40",
  },
  nagad: {
    label: "Nagad",
    brandClass: "text-[#F26522] bg-[#F26522]/10 border-[#F26522]/40",
  },
  sslcommerz: {
    label: "SSLCommerz",
    brandClass: "text-[#1E40AF] bg-[#1E40AF]/15 border-[#1E40AF]/40",
  },
  cod: {
    label: "Cash on Delivery",
    brandClass: "text-foreground bg-[var(--surface-2)] border-[var(--border-strong)]",
  },
};

export function OrderConfirmationContents() {
  const hydrated = useHydrated();
  const order = useOrderStore((s) => s.lastOrder);

  if (!hydrated) {
    return <ConfirmationSkeleton />;
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-8 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-[var(--surface-2)] text-muted">
          <Clock className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl tracking-tight md:text-3xl">
          No recent order on this device
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Place an order from the checkout to see your confirmation here. Your
          last completed order is also remembered for quick reference.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="/shop">Browse the Shop</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">View Cart</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ConfirmationCard order={order} />;
}

function ConfirmationCard({ order }: { order: Order }) {
  const [copied, setCopied] = React.useState(false);
  const payment = paymentLabels[order.payment];
  const created = new Date(order.createdAt);

  const copyOrderId = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/[0.06] p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
              <CheckCircle2 className="size-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wider text-[var(--success)]">
                Payment confirmed
              </p>
              <p className="mt-1 inline-flex flex-wrap items-center gap-2 font-serif text-2xl text-foreground">
                Order {order.id}
                <button
                  type="button"
                  onClick={copyOrderId}
                  className="inline-flex items-center gap-1 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-muted transition-colors hover:text-foreground"
                  aria-label="Copy order ID"
                >
                  <Copy className="size-3" />
                  {copied ? "Copied!" : "Copy"}
                </button>
              </p>
              <p className="mt-1 text-xs text-muted">
                Placed{" "}
                {created.toLocaleString("en-BD", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2">
            <ReceiptField label="Customer">{order.customerName}</ReceiptField>
            <ReceiptField label="UIU Student ID" mono>
              <span className="inline-flex items-center gap-1.5">
                <IdCard className="size-3.5 text-[var(--primary)]" />
                {order.studentId}
              </span>
            </ReceiptField>
            <ReceiptField label="Payment">
              <span
                className={`inline-flex items-center gap-2 rounded-md border px-2 py-0.5 text-xs font-semibold uppercase tracking-wider ${payment.brandClass}`}
              >
                {payment.label}
              </span>
              <span className="ml-2 inline-flex items-center gap-1 text-sm text-foreground">
                <Wallet className="size-3.5" />
                {formatBDT(order.total)}
              </span>
            </ReceiptField>
            <ReceiptField label="Fulfilment">
              {order.fulfilment === "pickup" ? (
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4 text-[var(--primary)]" />
                  Pickup at UIU
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="size-4 text-[var(--primary)]" />
                  Pathao / RedX delivery
                </span>
              )}
            </ReceiptField>

            {order.fulfilment === "pickup" && order.pickupTime && (
              <ReceiptField label="Ready by">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4 text-[var(--primary)]" />
                  {order.pickupTime}
                </span>
              </ReceiptField>
            )}

            {order.fulfilment === "delivery" && order.deliveryAddress && (
              <ReceiptField label="Delivery to" className="sm:col-span-2">
                <span className="inline-flex items-start gap-1.5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                  <span>{order.deliveryAddress}</span>
                </span>
              </ReceiptField>
            )}

            {order.phone && (
              <ReceiptField label="Phone">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="size-3.5 text-[var(--primary)]" />
                  {order.phone}
                </span>
              </ReceiptField>
            )}
          </div>

          <div className="mt-6 rounded-xl border border-[var(--border)] bg-[#0d0d0d] p-4">
            <p className="text-xs uppercase tracking-wider text-muted">
              Items in this order
            </p>
            <ul className="mt-3 divide-y divide-[var(--border)]">
              {order.items.map((item) => (
                <li
                  key={item.productId}
                  className="flex items-center gap-3 py-3"
                >
                  <div className="relative aspect-[3/4] w-10 shrink-0 overflow-hidden rounded border border-[var(--border)]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="line-clamp-2 text-sm text-foreground transition-colors hover:text-[var(--primary-soft)]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-0.5 text-[11px] text-muted">
                      {item.author && <span>{item.author} · </span>}
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-foreground">
                    {formatBDT(item.priceBDT * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 border-t border-[var(--border)] pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-mono text-foreground">
                  {formatBDT(order.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">
                  {order.fulfilment === "pickup" ? "Pickup" : "Delivery"}
                </dt>
                <dd
                  className={`font-mono ${
                    order.shipping === 0 ? "text-[var(--success)]" : "text-foreground"
                  }`}
                >
                  {order.shipping === 0 ? "Free" : formatBDT(order.shipping)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-[var(--border)] pt-2 text-base">
                <dt className="font-semibold text-foreground">Total</dt>
                <dd className="font-mono text-lg font-semibold text-foreground">
                  {formatBDT(order.total)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/">
                <Home className="size-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shop">
                Continue Shopping
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.print()}
            >
              <Printer className="size-4" />
              Print receipt
            </Button>
          </div>
        </div>
      </div>

      <aside className="space-y-4">
        <NextStep
          icon={CheckCircle2}
          title="Confirmation sent"
          body="A copy of this receipt is on its way to your registered UIU email."
        />
        {order.fulfilment === "pickup" ? (
          <>
            <NextStep
              icon={Clock}
              title={`Ready ${order.pickupTime ?? "later today"}`}
              body="We'll set your books aside at the campus counter."
            />
            <NextStep
              icon={MapPin}
              title="UIU Campus Store"
              body="Block A, Ground Floor — Sun–Thu, 9:00 AM–6:30 PM."
            />
          </>
        ) : (
          <>
            <NextStep
              icon={Truck}
              title="Out for delivery within 24h"
              body="Pathao or RedX rider will text you a tracking link shortly."
            />
            {order.deliveryAddress && (
              <NextStep
                icon={MapPin}
                title="Delivering to"
                body={order.deliveryAddress}
              />
            )}
          </>
        )}

        <div className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] p-5 text-xs text-muted">
          <p className="font-semibold text-foreground">
            Need to change something?
          </p>
          <p className="mt-2 leading-relaxed">
            Email us at{" "}
            <a
              className="text-[var(--primary-soft)] hover:text-[var(--primary)]"
              href="mailto:support@uiubooknest.bd"
            >
              support@uiubooknest.bd
            </a>{" "}
            within 30 minutes of placing your order and we&rsquo;ll cancel or
            update it for you.
          </p>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mt-4 -ml-2"
          >
            <Link href="/contact">
              <MessageSquare className="size-3.5" />
              Contact Support
            </Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}

function NextStep({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Clock;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
        <Icon className="size-5" />
      </div>
      <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted">{body}</p>
    </div>
  );
}

function ReceiptField({
  label,
  children,
  mono,
  className,
}: {
  label: string;
  children: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
      <p
        className={`mt-1 text-sm text-foreground ${mono ? "font-mono" : ""}`}
      >
        {children}
      </p>
    </div>
  );
}

function ConfirmationSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <Skeleton className="h-[600px] rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
        <Skeleton className="h-32 rounded-2xl" />
      </div>
    </div>
  );
}
