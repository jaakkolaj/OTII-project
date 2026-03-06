"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";

type JobPostingsToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
};

export function JobPostingsToolbar({
  query,
  onQueryChange,
}: JobPostingsToolbarProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search job profiles..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-11 w-full rounded-full border border-muted-foreground/30 bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <Link
        href="/job_postings/create_posting"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
      >
        <Plus className="h-4 w-4" />
        Add Job Posting
      </Link>
    </section>
  );
}
