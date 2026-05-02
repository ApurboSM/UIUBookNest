"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormState = "idle" | "submitting" | "success" | "error";

const NOTIFY_EMAIL = "mail.apurbosm2467@gmail.com";
const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${NOTIFY_EMAIL}`;

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [state, setState] = React.useState<FormState>("idle");

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (!message.trim() || message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setState("submitting");

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: window.location.origin,
          Referer: window.location.href,
        },
        body: JSON.stringify({
          _subject: `UIUBookNest Contact · ${name} · ${email}`,
          _captcha: "false",
          _template: "table",
          name: name.trim(),
          uiu_student_id: studentId.trim() || "(not provided)",
          email: email.trim(),
          message: message.trim(),
          sent_from_page: window.location.href,
          sent_at: new Date().toLocaleString("en-BD", {
            dateStyle: "full",
            timeStyle: "short",
          }),
        }),
      });

      const data = (await res.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      const ok =
        res.ok &&
        (data?.success === true ||
          data?.success === "true" ||
          !res.ok === false);

      if (ok) {
        setState("success");
        setName("");
        setStudentId("");
        setEmail("");
        setMessage("");
        setErrors({});
      } else {
        console.warn("[contact-form] FormSubmit replied:", data);
        setState("error");
      }
    } catch (err) {
      console.error("[contact-form] Network error:", err);
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 flex flex-col items-center gap-4 rounded-2xl border border-[var(--success)]/30 bg-[var(--success)]/10 px-8 py-12 text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
          className="inline-flex size-14 items-center justify-center rounded-full bg-[var(--success)] text-black shadow-[0_0_30px_-5px_rgba(34,197,94,0.6)]"
        >
          <Check className="size-7 stroke-[2.5]" />
        </motion.span>
        <h3 className="font-serif text-xl font-semibold tracking-tight text-foreground">
          Message sent!
        </h3>
        <p className="max-w-sm text-sm text-muted">
          Your message has been delivered to the UIUBookNest team. We&rsquo;ll
          reply within one business day — check{" "}
          <span className="text-foreground">{email || "your inbox"}</span>.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-2 text-xs text-[var(--primary-soft)] underline-offset-2 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name} required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={state === "submitting"}
            className={errors.name ? "border-red-500/60" : ""}
          />
        </Field>
        <Field label="UIU Student ID" error={undefined}>
          <Input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="011XXXXXXX"
            disabled={state === "submitting"}
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email} required>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname.lastname@bscse.uiu.ac.bd"
          disabled={state === "submitting"}
          className={errors.email ? "border-red-500/60" : ""}
        />
      </Field>

      <Field label="Message" error={errors.message} required>
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          disabled={state === "submitting"}
          className={`mt-2 flex w-full rounded-md border bg-[var(--surface)] px-3 py-2.5 text-sm text-foreground placeholder:text-[var(--muted-2)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.message
              ? "border-red-500/60 focus:border-red-500"
              : "border-[var(--border-strong)] focus:border-[var(--primary)]"
          }`}
        />
      </Field>

      {state === "error" && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          Something went wrong sending your message. Please try again or email
          us directly at{" "}
          <a
            href={`mailto:${NOTIFY_EMAIL}`}
            className="underline hover:text-red-300"
          >
            {NOTIFY_EMAIL}
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={state === "submitting"}
        className="w-full"
      >
        <AnimatePresence mode="wait" initial={false}>
          {state === "submitting" ? (
            <motion.span
              key="sending"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Loader2 className="size-4 animate-spin" />
              Sending…
            </motion.span>
          ) : (
            <motion.span
              key="send"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2"
            >
              <Send className="size-4" />
              Send Message
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
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
    <div>
      <label className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
        {required && (
          <span className="ml-0.5 text-[var(--primary)]" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
