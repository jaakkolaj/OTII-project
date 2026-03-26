"use client";

import { ArrowUpDown, LayoutList, KanbanSquare, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type ViewMode = "list" | "kanban";

type CandidatesToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
};

export function CandidatesToolbar({
  query,
  onQueryChange,
  viewMode,
  onViewModeChange,
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
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Sorted by AI fit score</span>
        <div className="flex rounded-lg border bg-muted p-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 w-7 p-0 ${viewMode === "list" ? "bg-background shadow-sm" : "hover:bg-background/60"}`}
            onClick={() => onViewModeChange("list")}
            title="Lista"
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-7 w-7 p-0 ${viewMode === "kanban" ? "bg-background shadow-sm" : "hover:bg-background/60"}`}
            onClick={() => onViewModeChange("kanban")}
            title="Kanban"
          >
            <KanbanSquare className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
