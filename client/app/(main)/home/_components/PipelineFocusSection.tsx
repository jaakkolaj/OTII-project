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

import {
  Activity,
  ArrowUpRight,
  Briefcase,
  FileText,
} from "lucide-react";

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
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Quick actions</CardTitle>
          <CardDescription>Jump straight to core ATS work.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button asChild variant="secondary" className="justify-between">
            <Link href="/job_postings">
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Open job postings
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/dashboard">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume analyzer
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Pipeline report
            </span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
