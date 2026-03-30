import { requireAuth } from "@/lib/auth/require-auth";
import { getJobPostings } from "@/app/services/jobPostingService";
import { getCandidatesInReview } from "@/app/services/homePageService";
import { StatsOverviewClient } from "./StatsOverviewClient";

export async function StatsOverview() {
  const jobpostings = await requireAuth(() => getJobPostings());
  const candidatesInReview = await requireAuth(() => getCandidatesInReview());

  const stats = {
    openRoles: jobpostings.length,
    candidatesInReview: candidatesInReview.filter((x: any) => x.status === "NEW").length,
    interviewsScheduled: candidatesInReview.filter((x: any) => x.status === "INTERVIEW").length,
  };

  return <StatsOverviewClient stats={stats} />;
}
