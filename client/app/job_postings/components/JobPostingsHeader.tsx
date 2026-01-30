"use client";

export function JobPostingsHeader() {
  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Job Postings
      </p>
      <h1 className="text-3xl font-bold">Manage job postings</h1>
      <p className="max-w-2xl text-muted-foreground">
        Create, edit, and review your open roles. Jump into a posting to see
        applicants and best matches.
      </p>
    </header>
  );
}
