import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileOverview } from "./_components/ProfileOverview";
import { SecuritySettings } from "./_components/SecuritySettings";
import { requireAuth } from "@/lib/auth/require-auth";
import { getJobPostings } from "@/app/services/jobPostingService";
import { getCandidatesInReview, getTasks } from "@/app/services/homePageService";

const formatLatestJobPostingDate = (value?: string | null) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default async function ProfilePage() {
  const [jobPostings, candidatesInReview, tasks] = await Promise.all([
    requireAuth(() => getJobPostings()),
    requireAuth(() => getCandidatesInReview()),
    requireAuth(() => getTasks()),
  ]);

  const openJobPostings = Array.isArray(jobPostings) ? jobPostings.length : 0;
  const totalCandidates = Array.isArray(candidatesInReview)
    ? candidatesInReview.length
    : 0;
  const tasksCreatedLength = Array.isArray(tasks) ? tasks.length : 0;
  const latestCreatedAt = Array.isArray(jobPostings)
    ? jobPostings
        .map((job) => {
          const jobWithCreatedAt = job as { created_at?: string; createdAt?: string };
          return jobWithCreatedAt.created_at ?? jobWithCreatedAt.createdAt ?? null;
        })
        .filter((value): value is string => Boolean(value))
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
    : null;

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <ProfileHeader />
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ProfileOverview
            openJobPostings={openJobPostings}
            totalCandidates={totalCandidates}
            tasksCreatedLength={tasksCreatedLength}
            latestJobPostingCreatedAt={formatLatestJobPostingDate(latestCreatedAt)}
          />
          <SecuritySettings />
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
        </section>
      </main>
  );
}
