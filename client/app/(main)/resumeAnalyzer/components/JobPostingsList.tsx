"use client";

import type { ResumeJobPosting } from "../types";
import { JobPostingCard } from "./JobPostingCard";

type JobPostingsListProps = {
  postings: ResumeJobPosting[];
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
