"use client";

import { useMemo, useState } from "react";
import type { JobPosting } from "@/app/types/jobPosting";
import { ResumeAnalyzerHeader } from "./ResumeAnalyzerHeader";
import { ResumeAnalyzerToolbar } from "./ResumeAnalyzerToolbar";
import { JobPostingsList } from "./JobPostingsList";

type ResumeAnalyzerListClientProps = {
  initialJobs: JobPosting[];
};

export default function ResumeAnalyzerListClient({
  initialJobs,
}: ResumeAnalyzerListClientProps) {
  const [query, setQuery] = useState("");

  const filteredJobs = useMemo(() => {
    const term = query.toLowerCase();
    return initialJobs.filter((posting) =>
      `${posting.title} ${posting.description} ${posting.location}`
        .toLowerCase()
        .includes(term),
    );
  }, [initialJobs, query]);

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <ResumeAnalyzerHeader total={filteredJobs.length} />
      <ResumeAnalyzerToolbar
        query={query}
        onQueryChange={setQuery}
        total={filteredJobs.length}
      />
      <JobPostingsList postings={filteredJobs} />
    </main>
  );
}
