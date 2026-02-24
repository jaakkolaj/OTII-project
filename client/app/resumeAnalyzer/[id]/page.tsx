"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import SidebarLayout from "@/app/SidebarLayout";
import { CandidatesHeader } from "./components/CandidatesHeader";
import { CandidatesToolbar } from "./components/CandidatesToolbar";
import { CandidatesList } from "./components/CandidatesList";
import type { ResumeCandidate } from "../types";
import { getAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";
import { getSignedURL } from "@/app/services/supaBaseService";

const jobTitleMap: Record<string, string> = {
  "full-stack-developer": "Full Stack Developer",
  "product-designer": "Product Designer",
  "data-analyst": "Data Analyst",
  "growth-marketer": "Growth Marketer",
};

type AiAnalysisResponse = {
  id: string;
  name: string;
  email: string;
  candidate_id?: string;
  skills?: unknown;
  strengths?: unknown;
  weaknesses?: unknown;
  score?: number;
  years_experience?: number;
  summary?: string;
  pdfUrl?: string;
};

const toStringList = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (!value) {
    return [];
  }
  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).map((item) =>
      String(item),
    );
  }
  return [String(value)];
};

export default function ResumeAnalyzerCandidatesPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const jobTitle = jobTitleMap[jobId] ?? "Selected role";

  const [query, setQuery] = useState("");
  const [candidates, setCandidates] = useState<ResumeCandidate[]>([]);

  useEffect(() => {
    const queryAiAnalyses = async () => {
      try {
        const response = await getAiAnalysisByJobPostingId(jobId);
        
        const data: AiAnalysisResponse[] = Array.isArray(response.data)
          ? response.data
          : Array.isArray(response.data?.data)
            ? response.data.data
            : [];
        const mappedCandidates = await Promise.all(
        data.map(async (analysis, index) => {
          let pdfUrl;
          if (analysis.candidate_id) {
            pdfUrl = await getSignedURL(analysis.candidate_id);
          }

          return {
            id: analysis.candidate_id ?? analysis.id ?? String(index),
            name: analysis.name,
            email: analysis.email,
            phone: "Unknown",
            position: jobTitle,
            strengths: toStringList(analysis.strengths),
            weaknesses: toStringList(analysis.weaknesses),
            topSkills: toStringList(analysis.skills),
            score:
              typeof analysis.score === "number"
                ? analysis.score
                : Math.round((analysis.years_experience ?? 0) * 10),
            rank: index + 1,
            pdfUrl: pdfUrl ?? "" // attach signed URL for the PDF
          };
        })
      );

        setCandidates(mappedCandidates);
      } catch (error) {
        console.log(error);
      }
    };
    queryAiAnalyses();
  }, [jobId, jobTitle]);

  const filteredCandidates = useMemo<ResumeCandidate[]>(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? candidates.filter((candidate) =>
          `${candidate.name} ${candidate.email} ${candidate.phone} ${candidate.position}`
            .toLowerCase()
            .includes(term),
        )
      : candidates;

    return matches;
  }, [candidates, query]);

  return (
    <SidebarLayout>
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <CandidatesHeader jobTitle={jobTitle} total={filteredCandidates.length} />
        <CandidatesToolbar
          query={query}
          onQueryChange={setQuery}
        />
        <CandidatesList candidates={filteredCandidates} />
      </main>
    </SidebarLayout>
  );
}
