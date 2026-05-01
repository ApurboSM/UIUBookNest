import { Skeleton } from "@/components/ui/skeleton";

export default function ReturnPolicyLoading() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        <Skeleton className="h-6 w-40 rounded-full" />
        <Skeleton className="mt-6 h-12 w-full max-w-2xl md:h-16" />
        <Skeleton className="mt-6 h-4 w-full max-w-2xl" />
        <Skeleton className="mt-2 h-4 w-3/4 max-w-xl" />
      </div>
      <div className="container-page pb-24">
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>
        <div className="space-y-8 max-w-3xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
