import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pipelines = [
  {
    role: "Senior Full-Stack Engineer",
    stage: "Onsite interviews",
    candidates: 5,
    owner: "Mia T.",
    sla: "Decision due in 2 days",
  },
  {
    role: "Product Designer",
    stage: "Portfolio review",
    candidates: 11,
    owner: "Leo K.",
    sla: "Hiring manager feedback today",
  },
  {
    role: "Data Analyst",
    stage: "Offer prep",
    candidates: 2,
    owner: "Ava R.",
    sla: "Offer letter in progress",
  },
];

const focusItems = [
  "Send interview packs for tomorrow's sessions.",
  "Approve the new sourcing budget for Q2.",
  "Review the top 3 candidates for Growth PM.",
  "Close the feedback loop on frontend assessments.",
];

export function PipelineFocusSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Priority pipelines</CardTitle>
          <CardDescription>Roles that need attention this week.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pipelines.map((item) => (
            <div
              key={item.role}
              className="flex flex-col gap-3 rounded-xl border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <p className="text-sm font-semibold">{item.role}</p>
                <p className="text-sm text-muted-foreground">
                  Owner: {item.owner}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {item.stage}
                </span>
                <span className="text-muted-foreground">
                  {item.candidates} candidates
                </span>
                <span className="text-muted-foreground">{item.sla}</span>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between border-t">
          <p className="text-sm text-muted-foreground">
            Keep momentum by refreshing stages daily.
          </p>
          <Button asChild variant="link">
            <Link href="/job_postings">Review pipelines</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Today&apos;s focus</CardTitle>
          <CardDescription>Prioritized recruiter tasks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {focusItems.map((item) => (
            <div key={item} className="flex gap-3 text-sm">
              <span className="mt-1 h-2 w-2 rounded-full bg-primary/80" />
              <p className="text-muted-foreground">{item}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between border-t">
          <Button variant="outline" size="sm">
            Add task
          </Button>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
