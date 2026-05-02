"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  IdCard,
  Loader2,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import {
  BkashMark,
  CodMark,
  NagadMark,
  SslCommerzMark,
} from "@/components/icons/payment-marks";
import { PaymentSuccessOverlay } from "@/components/shop/payment-success-overlay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useHydrated } from "@/lib/use-hydrated";
import { formatBDT } from "@/lib/format";
import { cn } from "@/lib/utils";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/order";
import type {
  FulfilmentMethod,
  Order,
  OrderItem,
  PaymentMethod,
} from "@/types";

const productById = Object.fromEntries(products.map((p) => [p.id, p]));

const fulfilmentOptions: Array<{
  id: FulfilmentMethod;
  title: string;
  body: string;
  cost: number;
  icon: typeof Building2;
  badge: string;
}> = [
  {
    id: "pickup",
    title: "Pickup at UIU Campus Store",
    body: "Block A, Ground Floor. Same-day on orders before 2 PM.",
    cost: 0,
    icon: Building2,
    badge: "Free",
  },
  {
    id: "delivery",
    title: "Home / Dorm Delivery",
    body: "Tracked Pathao or RedX rider across Dhaka.",
    cost: 60,
    icon: Truck,
    badge: "৳60",
  },
];

const paymentOptions: Array<{
  id: PaymentMethod;
  label: string;
  sub: string;
  Mark: typeof BkashMark;
}> = [
  {
    id: "bkash",
    label: "bKash",
    sub: "MFS · Send to 01XXXXXXXXX",
    Mark: BkashMark,
  },
  {
    id: "nagad",
    label: "Nagad",
    sub: "MFS · Send to 01XXXXXXXXX",
    Mark: NagadMark,
  },
  {
    id: "sslcommerz",
    label: "SSLCommerz",
    sub: "Cards, banks, MFS — all in one gateway",
    Mark: SslCommerzMark,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    sub: "Pay in cash at pickup or to the rider",
    Mark: CodMark,
  },
];

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useHydrated();

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const setLastOrder = useOrderStore((s) => s.setLastOrder);

  const [customerName, setCustomerName] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fulfilment, setFulfilment] = React.useState<FulfilmentMethod>("pickup");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [payment, setPayment] = React.useState<PaymentMethod>("bkash");
  const [processing, setProcessing] = React.useState(false);
  const [overlayStage, setOverlayStage] = React.useState<
    "processing" | "success" | "redirecting"
  >("processing");
  const [confirmedOrderId, setConfirmedOrderId] = React.useState<string | undefined>();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const lineItems = React.useMemo(
    () =>
      items
        .map((i) => {
          const product = productById[i.productId];
          if (!product) return null;
          return { ...i, product };
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [items]
  );

  const subtotal = lineItems.reduce(
    (sum, l) => sum + l.product.priceBDT * l.quantity,
    0
  );
  const itemCount = lineItems.reduce((sum, l) => sum + l.quantity, 0);
  const shipping = fulfilment === "delivery" ? 60 : 0;
  const total = subtotal + shipping;

  if (!hydrated) {
    return (
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-[600px] rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  if (lineItems.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-8 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
          <ShoppingBag className="size-7" />
        </div>
        <h2 className="mt-6 font-serif text-2xl tracking-tight md:text-3xl">
          Your cart is empty
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Add textbooks, stationery, or merchandise from the shop before
          heading to checkout.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild>
            <Link href="/shop">Browse the Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const validate = () => {
    const next: Record<string, string> = {};
    if (!customerName.trim()) next.customerName = "Please enter your full name.";
    if (!/^11\d{6,8}$/.test(studentId.replace(/\s/g, "")))
      next.studentId = "Enter a valid UIU Student ID starting with 11 (8–10 digits).";
    if (!/^01\d{9}$/.test(phone.replace(/\s/g, "")))
      next.phone = "Enter a valid Bangladeshi mobile number (11 digits).";
    if (fulfilment === "delivery" && deliveryAddress.trim().length < 10)
      next.deliveryAddress = "Please share your full delivery address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setOverlayStage("processing");
    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1800));

    const orderItems: OrderItem[] = lineItems.map((l) => ({
      productId: l.product.id,
      slug: l.product.slug,
      title: l.product.title,
      author: l.product.author,
      image: l.product.image,
      priceBDT: l.product.priceBDT,
      quantity: l.quantity,
    }));

    const orderId = generateOrderId();

    const order: Order = {
      id: orderId,
      studentId: studentId.trim(),
      customerName: customerName.trim(),
      fulfilment,
      payment,
      items: orderItems,
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
      pickupTime:
        fulfilment === "pickup"
          ? formatPickupTime()
          : undefined,
      deliveryAddress:
        fulfilment === "delivery" ? deliveryAddress.trim() : undefined,
      phone: phone.trim(),
    };

    setLastOrder(order);
    setConfirmedOrderId(orderId);
    setOverlayStage("success");

    void sendOrderNotification(order, email.trim());

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setOverlayStage("redirecting");
    router.prefetch("/order-confirmation");

    await new Promise((resolve) => setTimeout(resolve, 900));

    clearCart();
    router.push("/order-confirmation");
  };

  return (
    <>
    <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-8">
        <Section
          step="01"
          icon={IdCard}
          title="Contact &amp; UIU Student ID"
          description="We use this to confirm pickup at the campus counter and to send your receipt."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name"
              error={errors.customerName}
              required
            >
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Md Abidur Rahman"
                disabled={processing}
              />
            </Field>
            <Field
              label="UIU Student ID"
              error={errors.studentId}
              required
            >
              <Input
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="11222XXXXX"
                inputMode="numeric"
                disabled={processing}
              />
            </Field>
            <Field
              label="Mobile number"
              error={errors.phone}
              required
            >
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                inputMode="tel"
                disabled={processing}
              />
            </Field>
            <Field label="Email (optional)">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="firstname.lastname@bscse.uiu.ac.bd"
                disabled={processing}
              />
            </Field>
          </div>
        </Section>

        <Section
          step="02"
          icon={Truck}
          title="Fulfilment"
          description="Choose how you'd like your books — free at UIU, ৳60 anywhere in Dhaka."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {fulfilmentOptions.map((opt) => {
              const selected = fulfilment === opt.id;
              return (
                <label
                  key={opt.id}
                  className={cn(
                    "relative flex cursor-pointer flex-col gap-3 rounded-xl border p-4 transition-all",
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] shadow-[0_0_0_1px_var(--primary)]"
                      : "border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
                  )}
                >
                  <input
                    type="radio"
                    name="fulfilment"
                    value={opt.id}
                    checked={selected}
                    onChange={() => setFulfilment(opt.id)}
                    className="sr-only"
                    disabled={processing}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
                      <opt.icon className="size-5" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        opt.cost === 0
                          ? "border-[var(--success)]/40 bg-[var(--success)]/10 text-[var(--success)]"
                          : "border-[var(--border-strong)] bg-[var(--surface-2)] text-muted"
                      )}
                    >
                      {opt.badge}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {opt.title}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {opt.body}
                    </p>
                  </div>
                  {selected && (
                    <CheckCircle2 className="absolute right-3 top-3 size-4 text-[var(--primary)]" />
                  )}
                </label>
              );
            })}
          </div>

          {fulfilment === "delivery" && (
            <div className="mt-4">
              <Field
                label="Delivery address (Dhaka only)"
                error={errors.deliveryAddress}
                required
              >
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  rows={3}
                  placeholder="House, road, area — e.g. House 12, Road 5, Block C, Bashundhara R/A, Dhaka 1229"
                  className="flex w-full rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-sm text-foreground placeholder:text-[var(--muted-2)] transition-colors focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 disabled:opacity-60"
                  disabled={processing}
                />
              </Field>
            </div>
          )}
        </Section>

        <Section
          step="03"
          icon={Lock}
          title="Payment method"
          description="All payments are simulated for this MGT 3225 prototype — no real money moves."
        >
          <div className="grid gap-3">
            {paymentOptions.map((opt) => {
              const selected = payment === opt.id;
              return (
                <label
                  key={opt.id}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all",
                    selected
                      ? "border-[var(--primary)] bg-[var(--primary)]/[0.06] shadow-[0_0_0_1px_var(--primary)]"
                      : "border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--primary)]/40"
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={opt.id}
                    checked={selected}
                    onChange={() => setPayment(opt.id)}
                    className="sr-only"
                    disabled={processing}
                  />
                  <opt.Mark size="md" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {opt.label}
                    </p>
                    <p className="text-xs text-muted">{opt.sub}</p>
                  </div>
                  {selected && (
                    <CheckCircle2 className="size-5 text-[var(--primary)]" />
                  )}
                </label>
              );
            })}
          </div>
        </Section>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="font-serif text-xl tracking-tight">Order Summary</h2>

          <ul className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
            {lineItems.map((line) => (
              <li
                key={line.productId}
                className="flex items-start gap-3 border-b border-[var(--border)] pb-3 last:border-b-0"
              >
                <div className="relative aspect-[3/4] w-10 shrink-0 overflow-hidden rounded border border-[var(--border)] bg-[var(--surface-2)]">
                  <Image
                    src={line.product.image}
                    alt={line.product.imageAlt}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-medium text-foreground">
                    {line.product.title}
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted">
                    Qty {line.quantity}
                  </p>
                </div>
                <p className="shrink-0 font-mono text-xs text-foreground">
                  {formatBDT(line.product.priceBDT * line.quantity)}
                </p>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-[var(--border)] pt-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})</dt>
              <dd className="font-mono text-foreground">{formatBDT(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">
                {fulfilment === "pickup" ? "Pickup" : "Pathao / RedX delivery"}
              </dt>
              <dd
                className={cn(
                  "font-mono",
                  shipping === 0 ? "text-[var(--success)]" : "text-foreground"
                )}
              >
                {shipping === 0 ? "Free" : formatBDT(shipping)}
              </dd>
            </div>
            <div className="flex items-baseline justify-between border-t border-[var(--border)] pt-3 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-mono text-lg font-semibold text-foreground">
                {formatBDT(total)}
              </dd>
            </div>
          </dl>

          <Button
            type="submit"
            size="lg"
            className="mt-6 w-full"
            disabled={processing}
          >
            {processing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Processing payment…
              </>
            ) : (
              <>
                <Lock className="size-4" />
                Place Order &middot; {formatBDT(total)}
              </>
            )}
          </Button>

          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted">
            <ShieldCheck className="size-3.5 text-[var(--success)]" />
            DCOG-2021 compliant checkout
          </p>
        </div>
      </aside>
    </form>

    <PaymentSuccessOverlay
      open={processing}
      stage={overlayStage}
      payment={payment}
      amount={total}
      orderId={confirmedOrderId}
    />
    </>
  );
}

function Section({
  step,
  icon: Icon,
  title,
  description,
  children,
}: {
  step: string;
  icon: typeof Building2;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-start gap-4">
        <div className="flex size-11 items-center justify-center rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)]">
          <Icon className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-[var(--primary-soft)]">
            Step {step}
          </p>
          <h3
            className="font-serif text-xl tracking-tight text-foreground"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        {required && <span className="ml-1 text-[var(--primary)]">*</span>}
      </span>
      {children}
      {error && (
        <span className="text-[11px] text-[var(--danger)]">{error}</span>
      )}
    </label>
  );
}

function formatPickupTime() {
  const now = new Date();
  const pickup = new Date(now.getTime() + 4 * 60 * 60 * 1000);
  const day = pickup.toLocaleDateString("en-BD", { weekday: "long" });
  const time = pickup.toLocaleTimeString("en-BD", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day}, ${time}`;
}

function generateOrderId() {
  const random = Math.floor(10000 + Math.random() * 90000);
  return `UBN-2026-${random}`;
}

async function sendOrderNotification(order: Order, email: string) {
  try {
    const payload = {
      orderId: order.id,
      customerName: order.customerName,
      studentId: order.studentId,
      phone: order.phone,
      email,
      fulfilment: order.fulfilment,
      deliveryAddress: order.deliveryAddress,
      payment: order.payment,
      items: order.items.map((i) => ({
        title: i.title,
        quantity: i.quantity,
        priceBDT: i.priceBDT,
        lineTotalBDT: i.priceBDT * i.quantity,
      })),
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      createdAt: order.createdAt,
    };

    const res = await fetch("/api/order-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn("[checkout] order notification failed:", res.status);
    }
  } catch (err) {
    console.warn("[checkout] order notification error:", err);
  }
}
