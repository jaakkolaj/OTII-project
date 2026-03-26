import { requireAuth } from "@/lib/auth/require-auth";
import { getAllCandidates } from "@/app/services/candidateService";
import PipelineManager from "./_components/PipelineManager";
import type { CandidateStatus, KanbanCandidate } from "../resumeAnalyzer/types";

export default async function PipelinePage() {
  const raw = await requireAuth(() => getAllCandidates());

  const candidates: KanbanCandidate[] = raw.map(
    (c: { id: string; name: string; email: string; status: string }) => ({
      id: c.id,
      name: c.name ?? "Tuntematon",
      email: c.email ?? "",
      status: c.status as CandidateStatus,
    }),
  );

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          {candidates.length} kandidaattia kaikilta työpaikoilta
        </p>
      </div>
      <PipelineManager initialCandidates={candidates} />
    </main>
  );
}
