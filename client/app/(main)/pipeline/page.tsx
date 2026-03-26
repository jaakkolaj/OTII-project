import { requireAuth } from "@/lib/auth/require-auth";
import { getAllCandidates } from "@/app/services/candidateService";
import { getJobPostings } from "@/app/services/jobPostingService";
import PipelineManager from "./_components/PipelineManager";
import type { CandidateStatus, KanbanCandidate } from "../resumeAnalyzer/types";

export default async function PipelinePage() {
  const [raw, jobPostings] = await Promise.all([
    requireAuth(() => getAllCandidates()),
    requireAuth(() => getJobPostings()),
  ]);

  const candidates: KanbanCandidate[] = raw.map(
    (c: { id: string; name: string; email: string; status: string; job_posting_id: string }) => ({
      id: c.id,
      name: c.name ?? "Tuntematon",
      email: c.email ?? "",
      status: c.status as CandidateStatus,
      job_posting_id: c.job_posting_id,
    }),
  );

  const jobs = jobPostings.map((j: { id: string; title: string }) => ({
    id: j.id,
    title: j.title,
  }));

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <p className="text-sm text-muted-foreground">
          {candidates.length} kandidaattia kaikilta työpaikoilta
        </p>
      </div>
      <PipelineManager initialCandidates={candidates} jobPostings={jobs} />
    </main>
  );
}
