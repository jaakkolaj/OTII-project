"use client";

import { ArrowUpDown, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type CandidatesToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
};

export function CandidatesToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
}: CandidatesToolbarProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="pl-9"
          />
        </div>
        <div className="relative w-full md:max-w-[200px]">
          <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="h-9 w-full appearance-none rounded-md border bg-background px-3 pr-9 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <option value="score-desc">Highest score</option>
            <option value="score-asc">Lowest score</option>
            <option value="rank-asc">Ranked order</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
          </select>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        Sorted by AI fit score
      </div>
    </section>
  );
}
