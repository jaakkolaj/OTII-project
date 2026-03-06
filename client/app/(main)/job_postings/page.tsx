import { getJobPostings } from "../../services/jobPostingService";
import { JobPostingsManager } from "./_components/JobPostingManager";
import { JobPostingsHeader } from "./_components/JobPostingsHeader";
import { requireAuth } from "@/lib/require-auth";

export default async function JobPostingsPage() {
  const jobpostings = await requireAuth(() => getJobPostings());
  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <JobPostingsHeader />
      <JobPostingsManager initialJobs={jobpostings} />
    </main>
  );
}
