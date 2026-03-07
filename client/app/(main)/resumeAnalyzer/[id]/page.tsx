import ResumeAnalyzerClient from "./_components/ResumeAnalyzerManager";
import { getMappedCandidates } from "./data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const jobTitle = "Selected role";

  const initialCandidates = await getMappedCandidates(jobId, jobTitle);
  return (
    <ResumeAnalyzerClient
      jobId={jobId}
      jobTitle={jobTitle}
      initialCandidates={initialCandidates}
    />
  );
}
