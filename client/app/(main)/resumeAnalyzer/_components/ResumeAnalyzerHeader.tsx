type ResumeAnalyzerHeaderProps = {
  total: number;
};

export function ResumeAnalyzerHeader({ total }: ResumeAnalyzerHeaderProps) {
  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Resume Analyzer
      </p>
      <h1 className="text-3xl font-bold">AI-powered candidate ranking</h1>
      <p className="max-w-2xl text-muted-foreground">
        Select a job posting to see how applicants rank against your hiring
        criteria with OpenAI-assisted scoring.
      </p>
      <p className="text-sm text-muted-foreground">
        {total} job posting{total === 1 ? "" : "s"} available
      </p>
    </header>
  );
}
