"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidatesKanban } from "../../resumeAnalyzer/[id]/_components/CandidatesKanban";
import { updatePipelineCandidateStatusAction } from "../actions";
import type { CandidateStatus, KanbanCandidate } from "../../resumeAnalyzer/types";
import { useLanguage } from "@/lib/language-provider";

type JobPosting = { id: string; title: string };

export default function PipelineManager({
  initialCandidates,
  jobPostings,
}: {
  initialCandidates: KanbanCandidate[];
  jobPostings: JobPosting[];
}) {
  const { t } = useLanguage();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [query, setQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string>("all");
  const [, startTransition] = useTransition();

  const handleStatusChange = (candidateId: string, newStatus: CandidateStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c)),
    );
    startTransition(async () => {
      try {
        await updatePipelineCandidateStatusAction(candidateId, newStatus);
      } catch {
        setCandidates(initialCandidates);
        toast.error(t('dashboard.messages.errorSaving'));
      }
    });
  };

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return candidates.filter((c) => {
      const matchesJob = selectedJob === "all" || c.job_posting_id === selectedJob;
      const matchesSearch =
        c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term);
      return matchesJob && matchesSearch;
    });
  }, [candidates, query, selectedJob]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('dashboard.pipeline.searchPlaceholder')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={selectedJob} onValueChange={setSelectedJob}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder={t('dashboard.pipeline.selectJob')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('dashboard.pipeline.allJobPostings')}</SelectItem>
            {jobPostings.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>
      <CandidatesKanban candidates={filtered} onStatusChange={handleStatusChange} />
    </div>
  );
}
