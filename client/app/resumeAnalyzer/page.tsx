"use client";

import { useMemo, useState, useEffect } from "react";
import SidebarLayout from "@/app/SidebarLayout";
import { ResumeAnalyzerHeader } from "./components/ResumeAnalyzerHeader";
import { ResumeAnalyzerToolbar } from "./components/ResumeAnalyzerToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { JobPosting } from "../job_postings/types";
import { getJobPostings } from "../services/jobPostingService";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ResumeAnalyzerPage() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const router = useRouter();

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
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          console.log("Not Authenticated!");
          router.push("/login"); // client-side redirect jos tokenia ei löydy cookiesta
          return;
        }
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
    <SidebarLayout>
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <ResumeAnalyzerHeader />
        <ResumeAnalyzerToolbar
          query={query}
          onQueryChange={setQuery}
          total={filteredPostings.length}
        />
        <JobPostingsList postings={filteredPostings} />
      </main>
    </SidebarLayout>
  );
}
