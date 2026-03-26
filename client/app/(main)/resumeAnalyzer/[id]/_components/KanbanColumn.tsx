"use client";

import { useDroppable } from "@dnd-kit/core";
import type { CandidateStatus, KanbanCandidate } from "../../types";
import { KanbanCard } from "./KanbanCard";

const STATUS_COLORS: Record<CandidateStatus, string> = {
  NEW: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  SCREENING: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  INTERVIEW: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  OFFER: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  ACCEPTED: "bg-green-500/10 text-green-600 dark:text-green-400",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400",
};

type KanbanColumnProps = {
  status: CandidateStatus;
  label: string;
  candidates: KanbanCandidate[];
};

export function KanbanColumn({ status, label, candidates }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  return (
    <div className="flex w-64 shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-semibold">{label}</span>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[status]}`}
        >
          {candidates.length}
        </span>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-32 flex-col gap-2 overflow-y-auto rounded-2xl border p-3 transition-colors [max-height:calc(100vh-280px)] ${
          isOver
            ? "border-primary/40 bg-primary/5"
            : "border-border bg-muted/30"
        }`}
      >
        {candidates.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-6 text-xs text-muted-foreground">
            Ei kandidaatteja
          </div>
        ) : (
          candidates.map((candidate) => (
            <KanbanCard key={candidate.id} candidate={candidate} />
          ))
        )}
      </div>
    </div>
  );
}
