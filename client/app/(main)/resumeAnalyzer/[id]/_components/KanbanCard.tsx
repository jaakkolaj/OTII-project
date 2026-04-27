"use client";

import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Mail } from "lucide-react";
import type { KanbanCandidate } from "../../types";

type KanbanCardProps = {
  candidate: KanbanCandidate;
};

export function KanbanCard({ candidate }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: candidate.id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex cursor-grab flex-col gap-2 rounded-xl border bg-card p-3 shadow-sm transition-shadow active:cursor-grabbing ${
        isDragging ? "opacity-50 shadow-lg ring-2 ring-primary/30" : "hover:shadow-md"
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/candidates/${candidate.id}`}
          className="text-sm font-medium leading-tight hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {candidate.name}
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          {candidate.score !== undefined && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {candidate.score}%
            </span>
          )}
          <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Mail className="h-3 w-3 shrink-0" />
        <span className="truncate">{candidate.email}</span>
      </div>
      {candidate.topSkills && candidate.topSkills.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {candidate.topSkills.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {candidate.topSkills.length > 2 && (
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              +{candidate.topSkills.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
