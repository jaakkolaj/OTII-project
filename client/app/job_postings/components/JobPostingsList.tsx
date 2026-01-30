"use client";

import { JobPostingCard } from "./JobPostingCard";
import type { JobPosting } from "../types";

type JobPostingsListProps = {
  jobs: JobPosting[];
  isLoading: boolean;
  error: string | null;
  deletingId: string | null;
  onDelete: (jobId: string) => void;
};

export function JobPostingsList({
  jobs,
  isLoading,
  error,
  deletingId,
  onDelete,
}: JobPostingsListProps) {
  return (
    <section className="space-y-5">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-2xl border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
          Loading job postings...
        </div>
      ) : null}

      {!isLoading && jobs.length === 0 ? (
        <div className="rounded-2xl border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
          No job postings found yet.
        </div>
      ) : null}

      {jobs.map((job) => (
        <JobPostingCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          isDeleting={deletingId === job.id}
        />
      ))}
    </section>
  );
}
