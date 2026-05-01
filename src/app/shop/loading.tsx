import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonProductGrid } from "@/components/shared/skeletons";

export default function ShopLoading() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="mt-6 h-12 w-full max-w-2xl md:h-16" />
        <Skeleton className="mt-3 h-12 w-2/3 max-w-xl md:h-16" />
        <Skeleton className="mt-6 h-4 w-full max-w-2xl" />
      </div>

      <div className="container-page pb-24">
        <div className="mb-10 flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-36 rounded-full" />
          ))}
        </div>

        <div className="space-y-16">
          {Array.from({ length: 2 }).map((_, idx) => (
            <section key={idx}>
              <div className="mb-6 border-b border-[var(--border)] pb-4">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="mt-3 h-8 w-48" />
                <Skeleton className="mt-2 h-3 w-72" />
              </div>
              <SkeletonProductGrid count={4} />
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
