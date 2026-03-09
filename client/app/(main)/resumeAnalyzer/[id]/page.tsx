import ResumeAnalyzerClient from "./_components/ResumeAnalyzerManager";
import { getMappedCandidates } from "./data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const jobTitle = "Selected role";
    //status: analysis.status ?? "NEW" data.ts tiedostoon

  const initialCandidates = await getMappedCandidates(jobId, jobTitle);
  return (
    <ResumeAnalyzerClient
      jobId={jobId}
      jobTitle={jobTitle}
      initialCandidates={initialCandidates}
    />
  );
}
