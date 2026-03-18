// components/JobPostingsManager.tsx
"use client";

import { useState, useMemo } from "react";
import { JobPostingsToolbar } from "./JobPostingsToolbar";
import { JobPostingsList } from "./JobPostingsList";
import type { JobPosting } from "@/app/(main)/job_postings/_schemas/jobposting.schema";

export function JobPostingsManager({ initialJobs }: { initialJobs: JobPosting[] }) {
  const [query, setQuery] = useState("");

  const filteredJobs = useMemo(() => {
    if (!query.trim()) return initialJobs;
    const term = query.toLowerCase();
    return initialJobs.filter((job) =>
      `${job.title} ${job.description}`.toLowerCase().includes(term)
    );
  }, [initialJobs, query]);

  return (
    <div className="space-y-8">
      <JobPostingsToolbar query={query} onQueryChange={setQuery} />
      <JobPostingsList jobs={filteredJobs} />
    </div>
  );
}
