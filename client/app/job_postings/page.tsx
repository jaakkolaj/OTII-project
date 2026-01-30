"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import SidebarLayout from "@/app/SidebarLayout";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

type JobPosting = {
  id: string;
  title: string;
  description: string;
};

export default function JobPostingsList() {
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
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Job Postings
          </p>
          <h1 className="text-3xl font-bold">Manage job postings</h1>
          <p className="max-w-2xl text-muted-foreground">
            Create, edit, and review your open roles. Jump into a posting to
            see applicants and best matches.
          </p>
        </header>

        <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search job profiles..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-full border border-muted-foreground/30 bg-background pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Link
            href="/job_postings/create_posting"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
          >
            <Plus className="h-4 w-4" />
            Add Job Posting
          </Link>
        </section>

        <section className="space-y-5">
          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
              Loading job postings...
            </div>
          ) : null}

          {!isLoading && filteredJobs.length === 0 ? (
            <div className="rounded-2xl border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
              No job postings found yet.
            </div>
          ) : null}

          {filteredJobs.map((job) => (
            <article
              key={job.id}
              className="rounded-2xl border bg-card px-6 py-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                  </span>
                  <div className="space-y-1">
                    <h2 className="text-base font-semibold">{job.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <Link
                    href={`/job_postings/${job.id}`}
                    className="inline-flex items-center gap-2 font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    View best matches
                  </Link>
                  <Link
                    href={`/job_postings/${job.id}/edit`}
                    className="inline-flex items-center gap-2 font-medium text-muted-foreground transition hover:text-foreground"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(job.id)}
                    disabled={deletingId === job.id}
                    className="inline-flex items-center gap-2 font-medium text-destructive transition hover:text-destructive/80 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 className="h-4 w-4" />
                    {deletingId === job.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </SidebarLayout>
  );
}
