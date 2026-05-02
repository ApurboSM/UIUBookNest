"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ShopSearchBarProps = {
  initialQuery?: string;
  initialCategory?: string;
};

export function ShopSearchBar({
  initialQuery = "",
  initialCategory,
}: ShopSearchBarProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);
  const [prevInitial, setPrevInitial] = React.useState(initialQuery);

  if (initialQuery !== prevInitial) {
    setPrevInitial(initialQuery);
    setValue(initialQuery);
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (initialCategory) params.set("category", initialCategory);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  };

  const clear = () => {
    setValue("");
    const params = new URLSearchParams();
    if (initialCategory) params.set("category", initialCategory);
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className="ml-auto flex w-full items-center gap-2 sm:w-auto"
    >
      <div className="relative flex-1 sm:flex-none">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <Input
          name="q"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit(e);
            }
          }}
          placeholder="Search by title, author, course code…"
          className="h-10 w-full pl-9 pr-9 sm:w-[320px] lg:w-[380px]"
          aria-label="Search the catalogue"
        />
        {value && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-[var(--surface-2)] hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
      <Button type="submit" variant="primary" size="md" className="shrink-0">
        Search
      </Button>
    </form>
  );
}
