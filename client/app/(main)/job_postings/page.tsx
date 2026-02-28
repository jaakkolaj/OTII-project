"use client";

import { useEffect, useMemo, useState } from "react";
import { JobPostingsHeader } from "./components/JobPostingsHeader";
import { JobPostingsToolbar } from "./components/JobPostingsToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { JobPosting } from "./types";
import { getJobPostings } from "../../services/jobPostingService";
import axios from "axios";
import { deleteJobPosting } from "../../services/jobPostingService";

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
        const response = await getJobPostings();

        if (isMounted) {
          const data = Array.isArray(response.data)
            ? response.data
            : Array.isArray(response.data?.jobs)
              ? response.data.jobs
              : Array.isArray(response.data?.data)
                ? response.data.data
                : [];
          setJobs(data);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
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

  // JobPostingien poistamista varten
  const handleDelete = async (jobId: string) => {
    try {
      await deleteJobPosting(jobId);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      console.log("job posting successfully deleted")
    } catch(error) {
      return console.log(error);
    }
  };

  return (
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
  );
}
