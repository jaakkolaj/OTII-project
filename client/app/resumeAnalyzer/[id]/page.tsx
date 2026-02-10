"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SidebarLayout from "@/app/SidebarLayout";
import { CandidatesHeader } from "./components/CandidatesHeader";
import { CandidatesToolbar } from "./components/CandidatesToolbar";
import { CandidatesList } from "./components/CandidatesList";
import type { ResumeCandidate } from "../types";
import { getAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";

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
];

export default function ResumeAnalyzerCandidatesPage() {
  const { id : jobId} = useParams<{ id: string }>();
  const jobTitle = jobTitleMap[jobId] ?? "Selected role";

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("score-desc");

  useEffect(() => {
    const queryAiAnalyses = async () => {
      try {
        const response = await getAiAnalysisByJobPostingId(jobId);
        console.log(response)
      } catch(error) {
        console.log(error)
      }
    }
    queryAiAnalyses();
  }, [])

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
