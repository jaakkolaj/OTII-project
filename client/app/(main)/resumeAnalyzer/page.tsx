import { getJobPostings } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/auth/require-auth";
import ResumeAnalyzerListClient from "./_components/ResumeAnalyzerListManager";

export default async function ResumeAnalyzerPage() {
  const jobpostings = await requireAuth(() => getJobPostings());

  return <ResumeAnalyzerListClient initialJobs={jobpostings} />;
}
