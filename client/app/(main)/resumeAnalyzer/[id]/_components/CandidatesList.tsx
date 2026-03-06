"use client";

import type { ResumeCandidate } from "../../types";
import { CandidateCard } from "./CandidateCard";

type CandidatesListProps = {
  candidates: ResumeCandidate[];
  jobId: string;
};

export function CandidatesList({ candidates, jobId }: CandidatesListProps) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-2xl border bg-card px-6 py-8 text-sm text-muted-foreground shadow-sm">
        No candidates match your search.
      </div>
    );
  }

  return (
    <section className="grid gap-6">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} jobId={jobId} />
      ))}
    </section>
  );
}
