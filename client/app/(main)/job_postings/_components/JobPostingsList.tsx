"use client";

import { useTransition } from "react";
import { deleteJobPostingAction } from "../actions";
import { JobPostingCard } from "./JobPostingCard";
import type { JobPosting } from "@/app/types/jobPosting";
import { toast } from "sonner";


export function JobPostingsList({ jobs }: { jobs: JobPosting[] }) {
  const [isPending, startTransition] = useTransition();

   const handleDelete = (jobId: string) => {
    startTransition(async () => {
      try {
        await deleteJobPostingAction(jobId);
        toast.success("Työpaikka poistettu");
      } catch (e) {
        toast.error("Poisto epäonnistui");
      }
    });
  };

  if (jobs.length === 0) {
    return <div className="p-8 text-center text-muted-foreground border rounded-2xl">No jobs found.</div>;
  }
  
  return (
    <section className="space-y-4">
      {jobs.map((job) => (
        <JobPostingCard 
          key={job.id} 
          job={job} 
          onDelete={handleDelete} 
          isDeleting={isPending} 
        />
      ))}
    </section>
  );
}
