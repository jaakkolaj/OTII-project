type JobPostingDetailHeaderProps = {
  jobId: string;
};

export function JobPostingDetailHeader({
  jobId,
}: JobPostingDetailHeaderProps) {
  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        Job Posting
      </p>
      <h1 className="text-3xl font-bold">Job Detail for ID: {jobId}</h1>
      <p className="max-w-2xl text-muted-foreground">
        Upload applicant CVs for this job posting. Drag and drop files below or
        browse from your computer.
      </p>
    </header>
  );
}
