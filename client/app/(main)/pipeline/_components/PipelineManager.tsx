"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CandidatesKanban } from "../../resumeAnalyzer/[id]/_components/CandidatesKanban";
import { updatePipelineCandidateStatusAction } from "../actions";
import type { CandidateStatus, KanbanCandidate } from "../../resumeAnalyzer/types";

export default function PipelineManager({
  initialCandidates,
}: {
  initialCandidates: KanbanCandidate[];
}) {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [query, setQuery] = useState("");
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
        toast.error("Statuksen päivitys epäonnistui");
      }
    });
  };

  const filtered = useMemo(() => {
    const term = query.toLowerCase();
    return candidates.filter(
      (c) =>
        c.name.toLowerCase().includes(term) || c.email.toLowerCase().includes(term),
    );
  }, [candidates, query]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex rounded-2xl border bg-card p-6 shadow-sm">
        <div className="relative w-full md:max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Hae kandidaatteja..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </section>
      <CandidatesKanban candidates={filtered} onStatusChange={handleStatusChange} />
    </div>
  );
}
