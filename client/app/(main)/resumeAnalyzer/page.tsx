"use client";

import { useMemo, useState, useEffect } from "react";
import { ResumeAnalyzerHeader } from "./components/ResumeAnalyzerHeader";
import { ResumeAnalyzerToolbar } from "./components/ResumeAnalyzerToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { JobPosting } from "../job_postings/types";
import { getJobPostings } from "@/app/services/jobPostingService";
import axios from "axios";

export default function ResumeAnalyzerPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<JobPosting[]>([]);

  // Ladataan kaikki jobPostingit
  useEffect(() => {
    const loadJobPostings = async() => {
      try {
        const response = await getJobPostings();

        // Liitetään vastaukset osaksi jobs tilaa
        const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.jobs)
              ? response.data.jobs
              : Array.isArray(response.data?.data)
                ? response.data.data
                : [];
        setJobs(data);
      } catch (err: unknown) {
      }
    }
    loadJobPostings();
  }, []) 

  const filteredPostings = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? jobs.filter((posting) =>
          `${posting.title} ${posting.description} ${posting.location}`
            .toLowerCase()
            .includes(term),
        )
      : jobs;

    return matches;
  }, [query, jobs]);

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <ResumeAnalyzerHeader />
        <ResumeAnalyzerToolbar
          query={query}
          onQueryChange={setQuery}
          total={filteredPostings.length}
        />
        <JobPostingsList postings={filteredPostings} />
      </main>
  );
}
