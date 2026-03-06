import Link from "next/link";
import { ChevronLeft, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type CandidatesHeaderProps = {
  jobTitle: string;
  total: number;
  onRunAnalysis: () => void;
  onDeleteAll?: () => void;
  isLoading: boolean;
  analysisStatusText?: string;
};

export function CandidatesHeader({
  jobTitle,
  total,
  isLoading,
  onRunAnalysis,
  onDeleteAll,
  analysisStatusText,
}: CandidatesHeaderProps) {
  return (
    <header className="space-y-2">
      <Link
        href="/resumeAnalyzer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
        Resume Analyzer
      </Link>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidates</h1>
        <div className="flex gap-2">
          {onDeleteAll && (
            <Button
              onClick={onDeleteAll}
              disabled={isLoading || total === 0}
              variant="destructive"
              className="cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              Delete All
            </Button>
          )}
          <Button
            onClick={onRunAnalysis}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {isLoading ? (
              <>
                <span>Analyzing</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              "Run Analysis"
            )}
          </Button>
        </div>
      </div>
      <p className="max-w-2xl text-muted-foreground">
        {total} applicants ranked for{" "}
        <span className="font-medium text-foreground">{jobTitle}</span> based on
        your AI screening criteria.
      </p>
      {analysisStatusText ? (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-amber-900">
          <Loader2 className="h-4 w-4 animate-spin" />
          <p className="text-sm font-semibold">
            Analysis in progress: {analysisStatusText}
          </p>
        </div>
      ) : null}
    </header>
  );
}
