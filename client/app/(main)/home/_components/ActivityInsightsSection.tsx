import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const activityItems = [
  {
    title: "Offer accepted",
    detail: "Lina K. accepted the Backend Engineer offer.",
    time: "32 minutes ago",
  },
  {
    title: "New applicants",
    detail: "6 new candidates applied to Data Analyst.",
    time: "2 hours ago",
  },
  {
    title: "Interview feedback",
    detail: "Handover summary added for Senior Full-Stack.",
    time: "Yesterday",
  },
];

const insightItems = [
  {
    title: "Pipeline health",
    detail: "Engineering roles have a 78% response rate.",
  },
  {
    title: "Automation win",
    detail: "Auto-screening saved 4.6 hours this week.",
  },
  {
    title: "Risk alert",
    detail: "Design role is 10 days without shortlist update.",
  },
];

export function ActivityInsightsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Recent activity</CardTitle>
          <CardDescription>Latest updates across teams.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activityItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {item.time}
              </span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between border-t">
          <Button variant="outline" size="sm">
            Share update
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/job_postings">See more</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Automation insights</CardTitle>
          <CardDescription>
            ATS intelligence and workflow nudges.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {insightItems.map((item) => (
            <div key={item.title} className="flex gap-3">
              <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </span>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="justify-between border-t">
          <Button variant="outline" size="sm">
            Tune automations
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">Open analyzer</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
