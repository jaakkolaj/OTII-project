"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getJobPostingById, editJobPostingById } from "@/app/services/jobPostingService";

// Job-postauksen lomaketiedot
type JobFormState = {
  title: string;
  department: string;
  location: string;
  employmentType: string;
  seniority: string;
  description: string;
  requirements: string;
  salaryRange: string;
  closingDate: string;
};

// Lomakkeen alkuarvot
const emptyForm: JobFormState = {
  title: "",
  department: "",
  location: "",
  employmentType: "full-time",
  seniority: "mid",
  description: "",
  requirements: "",
  salaryRange: "",
  closingDate: "",
};

export default function EditJobPostingPage() {
  const params = useParams<{ id: string }>();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const router = useRouter();
  const [form, setForm] = useState<JobFormState>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect hookki lataa nykyisen jobPostingin datan ja syöttää arvot lomakkeeseen.
  useEffect(() => {
    if (!jobId) {
      setIsLoading(false);
      return;
    }

    const loadJob = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // service funktio apuna, joka lähettää GET pyynnön palvelimelle
      const response = await getJobPostingById(jobId);
      setForm((prev) => ({
        ...prev,
        title: response.data.title ?? "",
        department: response.data.department ?? "",
        description: response.data.description ?? "",
        location: response.data.location ?? "",
        employmentType: response.data.employmentType,
        salaryRange: response.data.salaryRange ?? "",
        requirements: response.data.requirements ?? "",
        seniority: response.data.seniority ?? ""
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load job posting."
      );
    } finally {
      setIsLoading(false);
    }
  };
    loadJob();
  }, [jobId]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // HandleSubmit käsittelee jobPostingin muokkauksen
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!jobId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const job: JobFormState = {
        title: form.title,
        department: form.department,
        location: form.location,
        employmentType: form.employmentType,
        seniority: form.seniority,
        description: form.description,
        requirements: form.requirements,
        salaryRange: form.salaryRange,
        closingDate: form.closingDate,
      }

      // Service funktio, joka lähettää PUT pyynnön palvelimelle
      await editJobPostingById(jobId, job);
      // Redirectaus takaisin jobPosting sivulle
      router.push(`/job_postings`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update job posting."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <header className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Link
              href="/job_postings"
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 transition hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to job postings
            </Link>
          </div>
          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Job Postings
          </p>
          <h1 className="text-3xl font-bold">Edit job posting</h1>
          <p className="max-w-2xl text-muted-foreground">
            Update the details for job ID: {jobId || "unknown"}.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : null}

          {isLoading ? (
            <div className="rounded-2xl border bg-card px-6 py-5 text-sm text-muted-foreground shadow-sm">
              Loading job posting...
            </div>
          ) : null}

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
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Backend Developer"
                  className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                Department
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Engineering"
                  className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Helsinki, Hybrid"
                  className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>

              <label className="space-y-2 text-sm font-medium">
                Employment type
                <select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
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
                  value={form.seniority}
                  onChange={handleChange}
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
                  value={form.salaryRange}
                  onChange={handleChange}
                  placeholder="€3,500 - €5,500"
                  className="h-11 w-full rounded-xl border border-muted-foreground/30 bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium md:col-span-2">
                Role description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the role, team, and main responsibilities."
                  className="min-h-[140px] w-full rounded-xl border border-muted-foreground/30 bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium md:col-span-2">
                Requirements
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
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
                  value={form.closingDate}
                  onChange={handleChange}
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
            <button
              type="submit"
              disabled={isSubmitting || isLoading || !jobId}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </main>
  );
}
