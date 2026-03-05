"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

type ResumeAnalyzerToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  total: number;
};

export function ResumeAnalyzerToolbar({
  query,
  onQueryChange,
  total,
}: ResumeAnalyzerToolbarProps) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search job profiles..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        {total} job posting{total === 1 ? "" : "s"}
      </div>
    </section>
  );
}
