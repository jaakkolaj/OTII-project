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

const STATUS_LABELS: Record<CandidateStatus, string> = {
  NEW: "Uusi",
  SCREENING: "Esikarsinta",
  INTERVIEW: "Haastattelu",
  OFFER: "Tarjous",
  ACCEPTED: "Hyväksytty",
  REJECTED: "Hylätty",
};

export function StatusSelect({
  candidateId,
  status,
}: {
  candidateId: string;
  status: CandidateStatus;
}) {
  const [isPending, startTransition] = useTransition();

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
        {(Object.keys(STATUS_LABELS) as CandidateStatus[]).map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
