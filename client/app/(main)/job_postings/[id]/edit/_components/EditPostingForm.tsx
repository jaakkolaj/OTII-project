"use client";

import { useActionState } from "react";
import Link from "next/link";
import { Briefcase } from "lucide-react";
import type { JobPosting } from "@/app/types/jobPosting";
import FormSubmitButton from "@/components/ui-build/formSubmitButton";
import { updateJobPostingAction, type EditPostingFormState } from "../actions";

const initialState: EditPostingFormState = null;

type EditPostingFormProps = {
  initialJob: JobPosting;
};

export default function EditPostingForm({ initialJob }: EditPostingFormProps) {
  const [state, formAction] = useActionState(updateJobPostingAction, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={initialJob.id} />

      {state?.error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 border-b pb-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </span>
          <div>
            <h2 className="text-lg font-semibold">Role details</h2>
            <p className="text-sm text-muted-foreground">
              Update the role content shown to applicants.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium">
            Job title
            <input
              name="title"
              defaultValue={initialJob.title}
              placeholder="e.g. Backend Developer"
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Department
            <input
              name="department"
              defaultValue={initialJob.department}
              placeholder="Engineering"
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Location
            <input
              name="location"
              defaultValue={initialJob.location}
              placeholder="Helsinki, Hybrid"
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>

          <label className="space-y-2 text-sm font-medium">
            Employment type
            <select
              name="employmentType"
              defaultValue={initialJob.employmentType || "full-time"}
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium">
            Seniority
            <select
              name="seniority"
              defaultValue={initialJob.seniority || "mid"}
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium">
            Salary range
            <input
              name="salaryRange"
              defaultValue={initialJob.salaryRange}
              placeholder="EUR 3,500 - EUR 5,500"
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Role description
            <textarea
              name="description"
              defaultValue={initialJob.description}
              placeholder="Describe the role, team, and main responsibilities."
              className="min-h-[140px] w-full rounded-xl border border-muted-foreground/30 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </label>

          <label className="space-y-2 text-sm font-medium md:col-span-2">
            Requirements
            <textarea
              name="requirements"
              defaultValue={initialJob.requirements}
              placeholder="Key skills, technologies, or experience needed."
              className="min-h-[120px] w-full rounded-xl border border-muted-foreground/30 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Publishing</h2>
            <p className="text-sm text-muted-foreground">
              Adjust the closing date or keep applications open.
            </p>
          </div>
          <label className="space-y-2 text-sm font-medium">
            Closing date
            <input
              type="date"
              name="closingDate"
              defaultValue={initialJob.closingDate}
              className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          href="/job_postings"
          className="inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-semibold transition hover:bg-muted"
        >
          Cancel
        </Link>
        <FormSubmitButton
          text="Save changes"
          loadingText="Saving"
          className="rounded-full"
        />
      </div>
    </form>
  );
}
