"use client";

import { JobPostingCard } from "./JobPostingCard";
import type { JobPosting } from "@/app/types/jobPosting";

export function JobPostingsList({ jobs }: { jobs: JobPosting[] }) {
  if (jobs.length === 0) {
    return <div className="p-8 text-center text-muted-foreground border rounded-2xl">No jobs found.</div>;
  }
  
  return (
    <section className="space-y-4">
      {jobs.map((job) => (
        <JobPostingCard key={job.id} job={job} />
      ))}
    </section>
  );
}
