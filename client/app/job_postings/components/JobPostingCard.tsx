"use client";

import Link from "next/link";
import { Briefcase, Eye, Pencil, Trash2 } from "lucide-react";

import type { JobPosting } from "../types";

type JobPostingCardProps = {
  job: JobPosting;
  onDelete: (jobId: string) => void;
  isDeleting: boolean;
};

export function JobPostingCard({
  job,
  onDelete,
  isDeleting,
}: JobPostingCardProps) {
  return (
    <article className="rounded-2xl border bg-card px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </span>
          <div className="space-y-1">
            <h2 className="text-base font-semibold">
              <Link
                href={`/job_postings/${job.id}`}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {job.title}
              </Link>
            </h2>
            <p className="text-sm text-muted-foreground">{job.description}</p>
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
            onClick={() => onDelete(job.id)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 font-medium text-destructive transition hover:text-destructive/80 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}
