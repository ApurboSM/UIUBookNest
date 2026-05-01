import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonProductGrid } from "@/components/shared/skeletons";

export default function HomeLoading() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" aria-hidden />
      <div className="container-page relative grid min-h-[640px] grid-cols-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <Skeleton className="h-6 w-64 rounded-full" />
          <Skeleton className="mt-6 h-14 w-full max-w-md md:h-20" />
          <Skeleton className="mt-3 h-14 w-full max-w-lg md:h-20" />
          <Skeleton className="mt-3 h-14 w-3/4 max-w-md md:h-20" />
          <Skeleton className="mt-6 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-lg" />
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-14 w-44" />
            <Skeleton className="h-14 w-44" />
          </div>
          <div className="mt-10 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-24 rounded-full" />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Skeleton className="h-[480px] w-[300px] rounded-lg" />
        </div>
      </div>

      <div className="container-page py-20">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="mt-4 h-10 w-full max-w-xl md:h-14" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      </div>

      <div className="container-page py-20">
        <Skeleton className="h-6 w-48 rounded-full" />
        <Skeleton className="mt-4 h-10 w-full max-w-xl md:h-14" />
        <div className="mt-12">
          <SkeletonProductGrid count={8} />
        </div>
      </div>
    </div>
  );
}
