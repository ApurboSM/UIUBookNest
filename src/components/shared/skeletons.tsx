import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonPageShell({
  showSidebar = false,
}: {
  showSidebar?: boolean;
}) {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="mt-6 h-12 w-full max-w-2xl md:h-16" />
        <Skeleton className="mt-3 h-12 w-full max-w-xl md:h-16" />
        <Skeleton className="mt-6 h-4 w-full max-w-2xl" />
        <Skeleton className="mt-2 h-4 w-3/4 max-w-xl" />
      </div>
      <div className="container-page pb-24">
        {showSidebar ? (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Skeleton className="h-[480px] rounded-2xl" />
            <Skeleton className="h-[480px] rounded-2xl" />
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
      <Skeleton className="aspect-[3/4] rounded-none" />
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="mt-3 h-5 w-24" />
      </div>
    </div>
  );
}

export function SkeletonProductGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}
