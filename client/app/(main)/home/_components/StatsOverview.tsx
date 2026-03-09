import { Briefcase, Calendar, Clock, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { requireAuth } from "@/lib/require-auth";
import { getJobPostings } from "@/app/services/jobPostingService";
import { getCandidatesInReview } from "@/app/services/homePageService";

export async function StatsOverview() {
  const jobpostings = await requireAuth(() => getJobPostings());
  const candidatesInReview = await requireAuth(() => getCandidatesInReview());

  const stats = [
    {
      label: "Open roles",
      value: jobpostings.length,
      icon: Briefcase,
    },
    {
      label: "Candidates in review",
      value: candidatesInReview.filter((x: any) => x.status === "NEW").length,
      icon: Users,
    },
    {
      label: "Interviews scheduled",
      value: candidatesInReview.filter((x: any) => x.status === "INTERVIEW").length,
      icon: Calendar,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </span>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
}
