type PageShellProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageShell({
  eyebrow,
  title,
  description,
  children,
}: PageShellProps) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-70" aria-hidden />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary-soft)]">
            <span className="size-1.5 rounded-full bg-[var(--primary)]" />
            {eyebrow}
          </div>
        )}
        <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        )}
      </div>

      <div className="container-page pb-24">{children}</div>
    </div>
  );
}
