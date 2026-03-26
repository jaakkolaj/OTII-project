import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Briefcase,
  CalendarDays,
  FileText,
  Star,
  BookOpen,
  Clock,
} from "lucide-react";
import { requireAuth } from "@/lib/auth/require-auth";
import { getCandidateById } from "@/app/services/candidateService";
import type { CandidateStatus } from "../../resumeAnalyzer/types";
import { StatusSelect } from "./_components/StatusSelect";
import { CandidateNotes } from "./_components/CandidateNotes";
import { DocumentDownload } from "./_components/DocumentDownload";

type CandidateNote = { id: string; content: string; created_at: string };
type CandidateDocument = {
  id: string;
  document_type: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  created_at: string;
};
type CandidateAnalysis = {
  id: string;
  score: number;
  skills: string[];
  years_experience: number;
  education_level: string;
  strengths: string[];
  weaknesses: string[];
  summary: string;
};

const EDUCATION_LABELS: Record<string, string> = {
  none: "Ei tutkintoa",
  bachelor: "Kandidaatti",
  master: "Maisteri",
  phd: "Tohtori",
};

export default async function CandidateDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const candidate: {
    id: string;
    name: string;
    email: string;
    status: CandidateStatus;
    createdAt: string;
    job_posting: { id: string; title: string };
    documents: CandidateDocument[];
    ai_analyses: CandidateAnalysis[];
    notes: CandidateNote[];
  } | null = await requireAuth(() => getCandidateById(id));

  if (!candidate) notFound();

  const analysis = candidate.ai_analyses[0] ?? null;

  return (
    <main className="container mx-auto flex flex-col gap-6 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link
          href="/pipeline"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Takaisin
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{candidate.name}</h1>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                {candidate.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5" />
                {candidate.job_posting.title}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(candidate.createdAt).toLocaleDateString("fi-FI")}
              </span>
            </div>
          </div>
          <StatusSelect candidateId={candidate.id} status={candidate.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          {/* AI Analysis */}
          {analysis ? (
            <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <h2 className="font-semibold">AI-analyysi</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {Math.round(analysis.score)}%
                </span>
              </div>

              {analysis.summary && (
                <p className="text-sm text-muted-foreground">{analysis.summary}</p>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Koulutus:</span>
                  <span className="font-medium">
                    {EDUCATION_LABELS[analysis.education_level] ?? analysis.education_level}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Kokemus:</span>
                  <span className="font-medium">{analysis.years_experience} vuotta</span>
                </div>
              </div>

              {Array.isArray(analysis.skills) && analysis.skills.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Taidot
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-muted px-2 py-0.5 text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                {Array.isArray(analysis.strengths) && analysis.strengths.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Vahvuudet
                    </p>
                    <ul className="flex flex-col gap-1">
                      {analysis.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-1.5 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(analysis.weaknesses) && analysis.weaknesses.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Kehityskohteet
                    </p>
                    <ul className="flex flex-col gap-1">
                      {analysis.weaknesses.map((w) => (
                        <li key={w} className="flex items-start gap-1.5 text-sm">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border bg-card p-6 shadow-sm text-sm text-muted-foreground">
              <Star className="h-4 w-4" />
              AI-analyysia ei ole tehty tälle kandidaatille.
            </div>
          )}

          {/* Notes */}
          <CandidateNotes
            candidateId={candidate.id}
            initialNotes={candidate.notes}
          />
        </div>

        {/* Sidebar: Documents */}
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm h-fit">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <h2 className="font-semibold">Dokumentit</h2>
          </div>

          {candidate.documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">Ei dokumentteja.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {candidate.documents.map((doc) => (
                <DocumentDownload
                  key={doc.id}
                  candidateId={candidate.id}
                  filename={doc.original_filename}
                  documentType={doc.document_type}
                  fileType={doc.file_type}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
