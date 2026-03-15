"use client";

import { JobPostingCard } from "./JobPostingCard";
import type { JobPosting } from "@/app/(main)/job_postings/_schemas/jobposting.schema";

type JobPostingsListProps = {
  postings: JobPosting[];
};
export function JobPostingsList({ postings }: JobPostingsListProps) {
  if (postings.length === 0) {
    return (
      <div className="rounded-2xl border bg-card px-6 py-8 text-sm text-muted-foreground shadow-sm">
        No job postings match your search.
      </div>
    );
  }

  return (
    <section className="grid gap-6">
      {postings.map((posting) => (
        <JobPostingCard key={posting.id} posting={posting} />
      ))}
    </section>
  );
}
