"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type CandidatesHeaderProps = {
  jobTitle: string;
  total: number;
};

export function CandidatesHeader({ jobTitle, total }: CandidatesHeaderProps) {
  return (
    <header className="space-y-2">
      <Link
        href="/resumeAnalyzer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Resume Analyzer
      </Link>
      <h1 className="text-3xl font-bold">Candidates</h1>
      <p className="max-w-2xl text-muted-foreground">
        {total} applicants ranked for{" "}
        <span className="font-medium text-foreground">{jobTitle}</span> based on
        your AI screening criteria.
      </p>
    </header>
  );
}
