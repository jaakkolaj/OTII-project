"use client";

import { useEffect, useMemo, useState } from "react";
import SidebarLayout from "@/app/SidebarLayout";
import { JobPostingsHeader } from "./components/JobPostingsHeader";
import { JobPostingsToolbar } from "./components/JobPostingsToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { JobPosting } from "./types";
import { getJobPostings } from "../services/jobPostingService";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export default function JobPostingsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getJobPostings(); // axios-response

        console.log("Status code:", response.status);

        if (response.status === 401) {
          console.log("Not Authenticated!");
          setError("Not Authenticated!");
          router.push("/login"); // ✅ client-side redirect
          return;
        }

        if (isMounted) {
          setJobs(response.data); // axios.data sisältää JobPosting[]
        }
      } catch (err: any) {
        setError(err.message ?? "Something went wrong");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredJobs = useMemo(() => {
    if (!query.trim()) return jobs;
    const term = query.toLowerCase();
    return jobs.filter((job) =>
      `${job.title} ${job.description}`.toLowerCase().includes(term)
    );
  }, [jobs, query]);

  const handleDelete = async (jobId: string) => {
  };

  return (
    <SidebarLayout>
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <JobPostingsHeader />
        <JobPostingsToolbar query={query} onQueryChange={setQuery} />
        <JobPostingsList
          jobs={filteredJobs}
          isLoading={isLoading}
          error={error}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </main>
    </SidebarLayout>
  );
}
