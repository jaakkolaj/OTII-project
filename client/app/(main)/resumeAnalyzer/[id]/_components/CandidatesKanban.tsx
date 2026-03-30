"use client";

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import type { CandidateStatus, KanbanCandidate } from "../../types";
import { KanbanColumn } from "./KanbanColumn";
import { useStatusLabels } from "@/lib/use-status-labels";

const STATUSES: CandidateStatus[] = [
  "NEW",
  "SCREENING",
  "INTERVIEW",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
];

type CandidatesKanbanProps = {
  candidates: KanbanCandidate[];
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
};

export function CandidatesKanban({ candidates, onStatusChange }: CandidatesKanbanProps) {
  const { getStatusLabels } = useStatusLabels();
  const statusLabels = getStatusLabels();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const grouped = STATUSES.reduce<Record<CandidateStatus, KanbanCandidate[]>>(
    (acc, status) => {
      acc[status] = candidates.filter((c) => c.status === status);
      return acc;
    },
    {} as Record<CandidateStatus, KanbanCandidate[]>,
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const candidateId = active.id as string;
    const newStatus = over.id as CandidateStatus;

    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate || candidate.status === newStatus) return;

    onStatusChange(candidateId, newStatus);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-full gap-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              label={statusLabels[status]}
              candidates={grouped[status]}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
