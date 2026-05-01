import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-12 pb-16 md:pt-16">
        <Skeleton className="h-4 w-28" />
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Skeleton className="mx-auto aspect-[3/4] w-full max-w-sm rounded-2xl" />
          <div className="space-y-4">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton className="h-12 w-full max-w-md md:h-16" />
            <Skeleton className="h-12 w-3/4 max-w-md md:h-16" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center gap-4 pt-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-6 w-28 rounded-full" />
            </div>
            <div className="space-y-2 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex gap-3 pt-4">
              <Skeleton className="h-14 w-44" />
              <Skeleton className="h-14 w-44" />
            </div>
            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-xl" />
              <Skeleton className="h-24 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
