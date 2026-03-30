"use client";

import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CandidateStatus } from "../../../resumeAnalyzer/types";
import { updateCandidateStatusAction } from "../actions";
import { useStatusLabels } from "@/lib/use-status-labels";

export function StatusSelect({
  candidateId,
  status,
}: {
  candidateId: string;
  status: CandidateStatus;
}) {
  const [isPending, startTransition] = useTransition();
  const { getStatusLabels } = useStatusLabels();
  const statusLabels = getStatusLabels();

  const handleChange = (newStatus: CandidateStatus) => {
    startTransition(async () => {
      await updateCandidateStatusAction(candidateId, newStatus);
    });
  };

  return (
    <Select
      value={status}
      onValueChange={(v) => handleChange(v as CandidateStatus)}
      disabled={isPending}
    >
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(statusLabels) as CandidateStatus[]).map((s) => (
          <SelectItem key={s} value={s}>
            {statusLabels[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
