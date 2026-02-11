"use client";

import { Briefcase, Calendar, Mail, Phone, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const profileHighlights = [
  {
    label: "Role",
    value: "Talent Acquisition Manager",
  },
  {
    label: "Team",
    value: "People Operations",
  },
  {
    label: "Primary focus",
    value: "Engineering & Data",
  },
  {
    label: "Time zone",
    value: "EET (UTC+2)",
  },
];

const workloadMetrics = [
  {
    label: "Open roles owned",
    value: "6",
    icon: Briefcase,
  },
  {
    label: "Candidates in review",
    value: "24",
    icon: Users,
  },
  {
    label: "Interviews this week",
    value: "5",
    icon: Calendar,
  },
];

export function ProfileOverview() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">Profile overview</CardTitle>
        <CardDescription>
          Your recruiter identity, workload, and quick stats at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              HL
            </span>
            <div>
              <p className="text-lg font-semibold">Hanna Lehtinen</p>
              <p className="text-sm text-muted-foreground">
                Talent Acquisition Manager · Northwind
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              hanna.lehtinen@northwind.ai
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +358 40 123 4567
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {profileHighlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-muted/30 p-3"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {workloadMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center gap-3 rounded-xl border bg-background p-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="text-sm font-semibold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t">
        <Button variant="outline" size="sm">
          Edit profile
        </Button>
        <Button variant="ghost" size="sm">
          View company page
        </Button>
      </CardFooter>
    </Card>
  );
}
