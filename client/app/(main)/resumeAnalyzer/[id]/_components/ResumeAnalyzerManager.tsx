"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { ResumeCandidate } from "../../types";
import { CandidatesHeader } from "./CandidatesHeader";
import { CandidatesToolbar } from "./CandidatesToolbar";
import { CandidatesList } from "./CandidatesList";
import {
  runAnalysisAction,
  deleteAllAnalysisAction,
  cancelAnalysisAction,
  getAnalyzedCandidatesAction,
} from "../actions";

type AnalysisStatus = {
  status: "processing" | "completed";
  totalCandidates: number;
  analyzedCandidates: number;
};

export default function ResumeAnalyzerClient({
  jobId,
  jobTitle,
  initialCandidates,
}: {
  jobId: string;
  jobTitle: string;
  initialCandidates: ResumeCandidate[];
}) {
  const storageKey = `ai-analysis-running-${jobId}`;
  const [query, setQuery] = useState("");
  const [candidates, setCandidates] =
    useState<ResumeCandidate[]>(initialCandidates);
  const [analysisStatus, setAnalysisStatus] =
    useState<AnalysisStatus | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const requestInFlightRef = useRef(false);
  const previousAnalyzedCountRef = useRef<number>(-1);
  const router = useRouter();

  const isLoading = isPending || isPolling;

  const stopPolling = () => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    setIsPolling(false);
    requestInFlightRef.current = false;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(storageKey);
    }
  };

  const stopPollingForUnmount = () => {
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

      if (data.analyzedCandidates !== previousAnalyzedCountRef.current) {
        const analyzedCandidates = await getAnalyzedCandidatesAction(
          jobId,
          jobTitle,
        );
        setCandidates(analyzedCandidates);
        previousAnalyzedCountRef.current = data.analyzedCandidates;
      }

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
    if (typeof window !== "undefined") {
      sessionStorage.setItem(storageKey, "1");
    }
    void fetchStatus();
    pollTimerRef.current = setInterval(() => {
      void fetchStatus();
    }, 3000);
  };

  useEffect(() => {
    setCandidates(initialCandidates);
  }, [initialCandidates]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const wasRunning = sessionStorage.getItem(storageKey) === "1";
      if (wasRunning) {
        startPolling();
      }
    }

    return () => stopPollingForUnmount();
  }, [storageKey]);

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
      setCandidates([]);
      setAnalysisStatus(null);
      previousAnalyzedCountRef.current = -1;
      toast.success("Every analysis have been removed!");
    });
  };

  const handleCancelAnalysis = () => {
    startTransition(async () => {
      try {
        await cancelAnalysisAction(jobId);
        stopPolling();
        setAnalysisStatus(null);
        previousAnalyzedCountRef.current = -1;
        toast.success("Analysis cancellation requested");
      } catch {
        toast.error("Failed to cancel analysis");
      }
    });
  };

  const filteredCandidates = useMemo(() => {
    const term = query.toLowerCase();
    return candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(term) ||
        candidate.email.toLowerCase().includes(term),
    );
  }, [candidates, query]);

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <CandidatesHeader
        jobTitle={jobTitle}
        total={filteredCandidates.length}
        onRunAnalysis={handleRunAnalysis}
        onCancelAnalysis={handleCancelAnalysis}
        onDeleteAll={handleDeleteAll}
        isLoading={isLoading}
        isPolling={isPolling}
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
