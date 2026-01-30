import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Briefcase,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const healthMetrics = [
  { label: "Sourcing", value: 62 },
  { label: "Screening", value: 44 },
  { label: "Interviewing", value: 71 },
  { label: "Offer", value: 28 },
];

export function HiringHealthSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <Card className="rounded-2xl lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Hiring health</CardTitle>
          <CardDescription>
            Keep pipelines balanced across stages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {healthMetrics.map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
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
