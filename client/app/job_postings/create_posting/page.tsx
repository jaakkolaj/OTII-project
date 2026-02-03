"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import SidebarLayout from "@/app/SidebarLayout";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

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

const initialForm: JobFormState = {
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

export default function CreateJobPostingPage() {
  const router = useRouter();
  const [form, setForm] = useState<JobFormState>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/job-postings`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        const message = payload?.error ?? "Failed to create job posting.";
        throw new Error(message);
      }

      router.push("/job_postings");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create job posting."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SidebarLayout>
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
          <h1 className="text-3xl font-bold">Create a new job posting</h1>
          <p className="max-w-2xl text-muted-foreground">
            Fill in the details below. You can edit the posting later or add
            applicant criteria once it is saved.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
              {error}
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
                  These fields appear on the job posting page.
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
                  Choose when to close applications or leave it open-ended.
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
              disabled={isSubmitting}
              className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background shadow-sm transition hover:bg-foreground/90"
            >
              {isSubmitting ? "Creating..." : "Create posting"}
            </button>
          </div>
        </form>
      </main>
    </SidebarLayout>
  );
}
