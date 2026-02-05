"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SidebarLayout from "@/app/SidebarLayout";
import { CandidatesHeader } from "./components/CandidatesHeader";
import { CandidatesToolbar } from "./components/CandidatesToolbar";
import { CandidatesList } from "./components/CandidatesList";
import type { ResumeCandidate } from "../types";

const jobTitleMap: Record<string, string> = {
  "full-stack-developer": "Full Stack Developer",
  "product-designer": "Product Designer",
  "data-analyst": "Data Analyst",
  "growth-marketer": "Growth Marketer",
};

const baseCandidates: ResumeCandidate[] = [
  {
    id: "matti-meikalainen",
    name: "Matti Meikalainen",
    email: "matti@gmail.com",
    phone: "044 123 4567",
    position: "Full Stack Developer",
    strengths: ["React", "Node.js", "System design"],
    weaknesses: ["Limited AWS experience"],
    topSkills: ["TypeScript", "GraphQL", "PostgreSQL"],
    score: 86,
    rank: 1,
  },
  {
    id: "erkki-esimerkki",
    name: "Erkki Esimerkki",
    email: "erkki@gmail.com",
    phone: "040 555 2211",
    position: "Full Stack Developer",
    strengths: ["API design", "Testing", "Mentoring"],
    weaknesses: ["Limited product analytics"],
    topSkills: ["Node.js", "Jest", "Docker"],
    score: 72,
    rank: 2,
  },
  {
    id: "aino-virtanen",
    name: "Aino Virtanen",
    email: "aino@gmail.com",
    phone: "050 902 7788",
    position: "Full Stack Developer",
    strengths: ["UI polish", "Accessibility", "Collaboration"],
    weaknesses: ["Less backend depth"],
    topSkills: ["React", "Figma", "CSS"],
    score: 64,
    rank: 3,
  },
];

export default function ResumeAnalyzerCandidatesPage() {
  const params = useParams<{ id: string }>();
  const jobId = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const jobTitle = jobTitleMap[jobId] ?? "Selected role";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("score-desc");

  const candidates = useMemo(
    () =>
      baseCandidates.map((candidate) => ({
        ...candidate,
        position: jobTitle,
      })),
    [jobTitle],
  );

  const filteredCandidates = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? candidates.filter((candidate) =>
          `${candidate.name} ${candidate.email} ${candidate.phone} ${candidate.position}`
            .toLowerCase()
            .includes(term),
        )
      : candidates;

    const sorted = [...matches];
    sorted.sort((a, b) => {
      switch (sort) {
        case "score-asc":
          return a.score - b.score;
        case "rank-asc":
          return a.rank - b.rank;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "score-desc":
        default:
          return b.score - a.score;
      }
    });
    return sorted;
  }, [candidates, query, sort]);

  return (
    <SidebarLayout>
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <CandidatesHeader jobTitle={jobTitle} total={filteredCandidates.length} />
        <CandidatesToolbar
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
        />
        <CandidatesList candidates={filteredCandidates} />
      </main>
    </SidebarLayout>
  );
}
