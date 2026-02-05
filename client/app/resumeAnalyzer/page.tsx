"use client";

import { useMemo, useState } from "react";
import SidebarLayout from "@/app/SidebarLayout";
import { ResumeAnalyzerHeader } from "./components/ResumeAnalyzerHeader";
import { ResumeAnalyzerToolbar } from "./components/ResumeAnalyzerToolbar";
import { JobPostingsList } from "./components/JobPostingsList";
import type { ResumeJobPosting } from "./types";

const jobPostings: ResumeJobPosting[] = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    description: "Modern JavaScript stack with React and Node.js.",
    applicants: 67,
    location: "Helsinki",
    status: "Open",
    lastUpdated: "2 days ago",
  },
  {
    id: "product-designer",
    title: "Product Designer",
    description: "Own the end-to-end UX for our SaaS platform.",
    applicants: 42,
    location: "Remote",
    status: "Open",
    lastUpdated: "4 days ago",
  },
  {
    id: "data-analyst",
    title: "Data Analyst",
    description: "Help teams make decisions with actionable insights.",
    applicants: 23,
    location: "Tampere",
    status: "Open",
    lastUpdated: "1 week ago",
  },
  {
    id: "growth-marketer",
    title: "Growth Marketer",
    description: "Drive demand gen and experiment with new channels.",
    applicants: 15,
    location: "Remote",
    status: "Paused",
    lastUpdated: "3 days ago",
  },
];

export default function ResumeAnalyzerPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("applicants-desc");

  const filteredPostings = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? jobPostings.filter((posting) =>
          `${posting.title} ${posting.description} ${posting.location}`
            .toLowerCase()
            .includes(term),
        )
      : jobPostings;

    const sorted = [...matches];
    sorted.sort((a, b) => {
      switch (sort) {
        case "applicants-asc":
          return a.applicants - b.applicants;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "applicants-desc":
        default:
          return b.applicants - a.applicants;
      }
    });
    return sorted;
  }, [query, sort]);

  return (
    <SidebarLayout>
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <ResumeAnalyzerHeader />
        <ResumeAnalyzerToolbar
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          total={filteredPostings.length}
        />
        <JobPostingsList postings={filteredPostings} />
      </main>
    </SidebarLayout>
  );
}
