"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import {
  BkashMark,
  CodMark,
  NagadMark,
  SslCommerzMark,
} from "@/components/icons/payment-marks";
import { formatBDT } from "@/lib/format";
import type { PaymentMethod } from "@/types";

type Stage = "processing" | "success" | "redirecting";

type PaymentSuccessOverlayProps = {
  open: boolean;
  stage: Stage;
  payment: PaymentMethod;
  amount: number;
  orderId?: string;
};

const paymentLabel: Record<PaymentMethod, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  sslcommerz: "SSLCommerz",
  cod: "Cash on Delivery",
};

function PaymentMark({ payment }: { payment: PaymentMethod }) {
  switch (payment) {
    case "bkash":
      return <BkashMark size="lg" />;
    case "nagad":
      return <NagadMark size="lg" />;
    case "sslcommerz":
      return <SslCommerzMark size="lg" />;
    default:
      return <CodMark size="lg" />;
  }
}

export function PaymentSuccessOverlay({
  open,
  stage,
  payment,
  amount,
  orderId,
}: PaymentSuccessOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Payment status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black/85 backdrop-blur-md"
        >
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(232,103,26,0.25) 0%, rgba(0,0,0,0) 65%)",
            }}
            aria-hidden
          />

          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              aria-hidden
              className="absolute size-1 rounded-full bg-[var(--primary)]"
              initial={{
                opacity: 0,
                x: 0,
                y: 0,
                scale: 0,
              }}
              animate={
                stage !== "processing"
                  ? {
                      opacity: [0, 1, 0],
                      x: Math.cos((i / 18) * Math.PI * 2) * 220,
                      y: Math.sin((i / 18) * Math.PI * 2) * 220,
                      scale: [0, 1.2, 0],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: 1.4,
                delay: stage !== "processing" ? 0.2 + (i % 6) * 0.05 : 0,
                ease: "easeOut",
              }}
              style={{
                left: "50%",
                top: "44%",
              }}
            />
          ))}

          <FlyingOwl stage={stage} />

          <div className="relative z-10 mt-[300px] flex w-full max-w-md flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              {stage === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-soft)]">
                    <ProcessingDots />
                    Talking to <PaymentMark payment={payment} />
                  </div>
                  <h2 className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    Processing your payment…
                  </h2>
                  <p className="text-sm text-muted">
                    Confirming{" "}
                    <span className="text-foreground">
                      {formatBDT(amount)}
                    </span>{" "}
                    via{" "}
                    <span className="text-foreground">
                      {paymentLabel[payment]}
                    </span>
                    . This usually takes a moment.
                  </p>
                </motion.div>
              )}

              {(stage === "success" || stage === "redirecting") && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col items-center gap-3"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 18,
                      delay: 0.1,
                    }}
                    className="relative inline-flex items-center justify-center"
                  >
                    <span className="absolute inset-0 -m-3 animate-ping rounded-full bg-[var(--success)]/30 [animation-duration:1.6s]" />
                    <span className="relative inline-flex size-16 items-center justify-center rounded-full bg-[var(--success)] text-black shadow-[0_0_40px_-5px_rgba(34,197,94,0.7)]">
                      <CheckCircle2 className="size-9 stroke-[2.5]" />
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.4 }}
                    className="font-serif text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                  >
                    Payment Successful
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-sm text-muted"
                  >
                    <span className="text-foreground">
                      {formatBDT(amount)}
                    </span>{" "}
                    confirmed via{" "}
                    <span className="text-foreground">
                      {paymentLabel[payment]}
                    </span>
                  </motion.p>

                  {orderId && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.4 }}
                      className="mt-2 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-1.5"
                    >
                      <span className="text-[10px] uppercase tracking-wider text-muted">
                        Order
                      </span>
                      <span className="font-mono text-sm font-semibold text-[var(--primary-soft)]">
                        {orderId}
                      </span>
                    </motion.div>
                  )}

                  {stage === "redirecting" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="mt-4 inline-flex items-center gap-2 text-xs text-muted"
                    >
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--primary)] opacity-60" />
                        <span className="relative inline-flex size-2 rounded-full bg-[var(--primary)]" />
                      </span>
                      Redirecting to your receipt…
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FlyingOwl({ stage }: { stage: Stage }) {
  const flightKeyframes = React.useMemo(
    () => ({
      x: [-260, -180, -90, 0],
      y: [180, 60, -40, 0],
      rotate: [-12, -4, 6, 0],
      scale: [0.7, 0.9, 1.05, 1],
    }),
    []
  );

  const successKeyframes = React.useMemo(
    () => ({
      y: [0, -8, 0, -4, 0],
      rotate: [0, 4, -3, 2, 0],
      scale: [1, 1.08, 1, 1.04, 1],
    }),
    []
  );

  return (
    <motion.div
      key="owl"
      initial={{ opacity: 0, ...flightKeyframes, x: -260, y: 180, rotate: -12, scale: 0.7 }}
      animate={
        stage === "processing"
          ? {
              opacity: 1,
              x: flightKeyframes.x,
              y: flightKeyframes.y,
              rotate: flightKeyframes.rotate,
              scale: flightKeyframes.scale,
            }
          : {
              opacity: 1,
              x: 0,
              y: successKeyframes.y,
              rotate: successKeyframes.rotate,
              scale: successKeyframes.scale,
            }
      }
      transition={
        stage === "processing"
          ? { duration: 1.4, ease: "easeInOut", times: [0, 0.4, 0.75, 1] }
          : {
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }
      }
      className="absolute left-1/2 top-[20%] z-20 -translate-x-1/2"
    >
      <div className="relative">
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-8 rounded-full bg-[var(--primary)]/20 blur-2xl"
          aria-hidden
        />
        <div className="relative inline-flex size-32 items-center justify-center rounded-2xl border border-[var(--border-strong)] bg-black p-3 shadow-[0_25px_60px_-15px_rgba(232,103,26,0.55)]">
          <Image
            src="/logo.png"
            alt="UIUBookNest"
            width={128}
            height={70}
            className="h-auto w-full object-contain"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}

function ProcessingDots() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block size-1 rounded-full bg-[var(--primary)]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </span>
  );
}
