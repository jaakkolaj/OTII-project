"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CandidatesHeader } from "./CandidatesHeader";
import { CandidatesToolbar } from "./CandidatesToolbar";
import { CandidatesList } from "./CandidatesList";
import { runAnalysisAction, deleteAllAnalysisAction } from "../actions";

type AnalysisStatus = {
  status: "processing" | "completed";
  totalCandidates: number;
  analyzedCandidates: number;
};

export default function ResumeAnalyzerClient({
  jobId,
  jobTitle,
  initialCandidates,
}: any) {
  const [query, setQuery] = useState("");
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const requestInFlightRef = useRef(false);
  const router = useRouter();

  const isLoading = isPending || isPolling;

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    setIsPolling(false);
    requestInFlightRef.current = false;
  };

  const fetchStatus = async () => {
    if (requestInFlightRef.current) return;
    requestInFlightRef.current = true;

    try {
      const response = await fetch(
        `http://localhost:5001/aiAnalysis/jobPostings/${jobId}/ai-analysis`,
        { method: "POST" },
      );

      if (!response.ok) {
        throw new Error(`Status fetch failed: ${response.status}`);
      }

      const data: AnalysisStatus = await response.json();
      setAnalysisStatus(data);

      if (data.status === "completed") {
        stopPolling();
        toast.success("Analysis ready!");
        router.refresh();
      }
    } catch {
      stopPolling();
      toast.error("Failed to fetch status of analysis");
    } finally {
      requestInFlightRef.current = false;
    }
  };

  const startPolling = () => {
    if (pollTimerRef.current) return;
    setIsPolling(true);
    void fetchStatus();
    pollTimerRef.current = setInterval(() => {
      void fetchStatus();
    }, 3000);
  };

  useEffect(() => {
    return () => stopPolling();
  }, []);

  const handleRunAnalysis = () => {
    startTransition(async () => {
      try {
        await runAnalysisAction(jobId);
        toast.message("Analysis in progress...");
        startPolling();
      } catch {
        toast.error("Error in analysis");
      }
    });
  };

  const handleDeleteAll = () => {
    startTransition(async () => {
      await deleteAllAnalysisAction(jobId);
      toast.success("Every analysis have been removed!");
    });
  };

  const filteredCandidates = useMemo(() => {
    const term = query.toLowerCase();
    return initialCandidates.filter(
      (candidate: any) =>
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term),
    );
  }, [initialCandidates, query]);

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <CandidatesHeader
        jobTitle={jobTitle}
        total={filteredCandidates.length}
        onRunAnalysis={handleRunAnalysis}
        onDeleteAll={handleDeleteAll}
        isLoading={isLoading}
        analysisStatusText={
          analysisStatus?.status === "processing"
            ? `${analysisStatus.analyzedCandidates}/${analysisStatus.totalCandidates} analysoitu`
            : undefined
        }
      />
      <CandidatesToolbar query={query} onQueryChange={setQuery} />
      <CandidatesList candidates={filteredCandidates} />
    </main>
  );
}
