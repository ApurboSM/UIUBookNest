import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 top-0 h-[420px] bg-radial-glow opacity-50"
        aria-hidden
      />
      <div className="container-page relative pt-16 pb-12 md:pt-20 md:pb-16">
        <Skeleton className="h-6 w-44 rounded-full" />
        <Skeleton className="mt-6 h-12 w-full max-w-2xl md:h-16" />
        <Skeleton className="mt-3 h-12 w-2/3 max-w-xl md:h-16" />
        <Skeleton className="mt-6 h-4 w-full max-w-2xl" />
      </div>

      <div className="container-page pb-24">
        <div className="mb-10 flex flex-wrap gap-3">
          <Skeleton className="h-12 w-56 rounded-md" />
          <Skeleton className="h-12 w-44 rounded-md" />
        </div>
        <div className="grid gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
