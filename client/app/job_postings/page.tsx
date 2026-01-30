"use client";

import { useEffect, useMemo, useState } from "react";
import SidebarLayout from "@/app/SidebarLayout";
import { JobPostingsHeader } from "./components/JobPostingsHeader";
import { JobPostingsToolbar } from "./components/JobPostingsToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { JobPosting } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export default function JobPostingsPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadJobs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/job-postings`);
        console.log("Fetch response:", response);
        if (!response.ok) {
          const payload = await response.json().catch(() => null);
          const message = payload?.error ?? "Failed to load job postings.";
          throw new Error(message);
        }
        const data = (await response.json()) as JobPosting[];
        if (isMounted) {
          setJobs(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to load job postings."
          );
        }
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
    const confirmed = window.confirm(
      "Delete this job posting? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(jobId);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/job-postings/${jobId}`, {
        method: "DELETE",
      });
      if (!response.ok && response.status !== 204) {
        const payload = await response.json().catch(() => null);
        const message = payload?.error ?? "Failed to delete job posting.";
        throw new Error(message);
      }
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete job posting."
      );
    } finally {
      setDeletingId(null);
    }
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
