import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFY_EMAIL = "mail.apurbosm2467@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`;
const PUBLIC_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type OrderItemPayload = {
  title: string;
  quantity: number;
  priceBDT: number;
  lineTotalBDT: number;
};

type OrderNotificationPayload = {
  orderId: string;
  customerName: string;
  studentId: string;
  phone: string;
  email?: string;
  fulfilment: "pickup" | "delivery";
  deliveryAddress?: string;
  payment: "bkash" | "nagad" | "sslcommerz" | "cod";
  items: OrderItemPayload[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
};

const paymentLabel: Record<OrderNotificationPayload["payment"], string> = {
  bkash: "bKash",
  nagad: "Nagad",
  sslcommerz: "SSLCommerz",
  cod: "Cash on Delivery",
};

const fulfilmentLabel: Record<
  OrderNotificationPayload["fulfilment"],
  string
> = {
  pickup: "Pickup at UIU Campus Store",
  delivery: "Home / Dorm Delivery (Pathao / RedX)",
};

function formatBDT(value: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(value);
}

function buildEmailBody(order: OrderNotificationPayload) {
  const itemsBlock = order.items
    .map(
      (i) =>
        `  - ${i.title}\n    Qty ${i.quantity} x ${formatBDT(i.priceBDT)} = ${formatBDT(i.lineTotalBDT)}`,
    )
    .join("\n");

  return [
    "NEW UIUBookNest ORDER",
    "===========================================",
    "",
    `Order ID:        ${order.orderId}`,
    `Placed at:       ${new Date(order.createdAt).toLocaleString("en-BD", { dateStyle: "full", timeStyle: "short" })}`,
    "",
    "-- STEP 01 - Contact & UIU Student ID --",
    `Customer Name:   ${order.customerName}`,
    `UIU Student ID:  ${order.studentId}`,
    `Mobile Number:   ${order.phone}`,
    `Email:           ${order.email || "(not provided)"}`,
    "",
    "-- STEP 02 - Fulfilment --",
    `Method:          ${fulfilmentLabel[order.fulfilment]}`,
    order.fulfilment === "delivery"
      ? `Delivery Addr:   ${order.deliveryAddress}`
      : `Pickup at:       Block A, Ground Floor, UIU Campus Store`,
    "",
    "-- STEP 03 - Payment --",
    `Method:          ${paymentLabel[order.payment]}`,
    "",
    "-- Order Items --",
    itemsBlock,
    "",
    "-- Totals --",
    `Subtotal:        ${formatBDT(order.subtotal)}`,
    `Shipping:        ${order.shipping === 0 ? "Free" : formatBDT(order.shipping)}`,
    `TOTAL:           ${formatBDT(order.total)}`,
    "",
    "===========================================",
    "Sent automatically by UIUBookNest checkout.",
    "MGT 3225 E-Business - Spring 2026 - Group 07",
  ].join("\n");
}

export async function POST(request: Request) {
  let order: OrderNotificationPayload;
  try {
    order = (await request.json()) as OrderNotificationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!order.orderId || !order.customerName || !order.items?.length) {
    return NextResponse.json(
      { ok: false, error: "Missing required order fields" },
      { status: 400 },
    );
  }

  const subject = `UIUBookNest Order ${order.orderId} - ${order.customerName} - ${formatBDT(order.total)}`;

  const formsubmitPayload = {
    _subject: subject,
    _template: "table",
    _captcha: "false",
    name: order.customerName,
    student_id: order.studentId,
    mobile: order.phone,
    email: order.email || "(not provided)",
    fulfilment: fulfilmentLabel[order.fulfilment],
    delivery_address: order.deliveryAddress || "(pickup at campus)",
    payment_method: paymentLabel[order.payment],
    order_id: order.orderId,
    items_count: String(order.items.length),
    subtotal: formatBDT(order.subtotal),
    shipping:
      order.shipping === 0 ? "Free (campus pickup)" : formatBDT(order.shipping),
    total: formatBDT(order.total),
    placed_at: new Date(order.createdAt).toLocaleString("en-BD"),
    items_summary: order.items
      .map(
        (i) =>
          `${i.title} x ${i.quantity} = ${formatBDT(i.lineTotalBDT)}`,
      )
      .join(" | "),
    full_receipt: buildEmailBody(order),
  };

  const requestOrigin =
    request.headers.get("origin") ||
    request.headers.get("referer") ||
    PUBLIC_ORIGIN;

  console.log(
    "[order-notification] Forwarding order",
    order.orderId,
    "to FormSubmit (origin=" + requestOrigin + ")",
  );

  try {
    const formsubmitResponse = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: requestOrigin,
        Referer: requestOrigin,
        "User-Agent":
          "UIUBookNest/1.0 (+https://github.com/uiu-booknest) Mozilla/5.0",
      },
      body: JSON.stringify(formsubmitPayload),
      cache: "no-store",
    });

    const rawBody = await formsubmitResponse.text();
    let data: { success?: string | boolean; message?: string } | null = null;
    try {
      data = JSON.parse(rawBody);
    } catch {
      console.warn(
        "[order-notification] FormSubmit non-JSON body:",
        rawBody.slice(0, 200),
      );
    }

    const reportedSuccess =
      data?.success === true ||
      data?.success === "true" ||
      (data === null && formsubmitResponse.ok);

    console.log(
      "[order-notification] FormSubmit reply:",
      formsubmitResponse.status,
      "success=" + String(data?.success),
      data?.message ? '"' + data.message + '"' : "(no message)",
    );

    if (!formsubmitResponse.ok || !reportedSuccess) {
      const needsActivation = Boolean(
        data?.message && /activat/i.test(String(data.message)),
      );
      return NextResponse.json(
        {
          ok: false,
          provider: "formsubmit",
          status: formsubmitResponse.status,
          providerMessage:
            data?.message || rawBody.slice(0, 200) || "Unknown error",
          needsActivation,
          activationHint: needsActivation
            ? `FormSubmit just sent an activation email to ${NOTIFY_EMAIL}. Open it and click "Activate Form". After that, every order will land in your inbox automatically.`
            : undefined,
          orderId: order.orderId,
        },
        { status: 502 },
      );
    }

    console.log(
      "[order-notification] Order",
      order.orderId,
      "delivered to",
      NOTIFY_EMAIL,
    );

    return NextResponse.json({
      ok: true,
      provider: "formsubmit",
      providerMessage: data?.message || "Sent",
      orderId: order.orderId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[order-notification] Network error:", message);
    return NextResponse.json(
      {
        ok: false,
        provider: "formsubmit",
        error: "Network error reaching FormSubmit",
        details: message,
      },
      { status: 502 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "/api/order-notification",
    method: "POST",
    notifyEmail: NOTIFY_EMAIL,
    provider: "formsubmit",
  });
}
