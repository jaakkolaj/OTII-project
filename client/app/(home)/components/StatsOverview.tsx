import { Briefcase, Calendar, Clock, Users } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    label: "Open roles",
    value: "12",
    detail: "2 new roles created this week",
    icon: Briefcase,
  },
  {
    label: "Candidates in review",
    value: "48",
    detail: "9 waiting for recruiter feedback",
    icon: Users,
  },
  {
    label: "Interviews scheduled",
    value: "7",
    detail: "Next interview in 3 hours",
    icon: Calendar,
  },
  {
    label: "Average time to hire",
    value: "21 days",
    detail: "Down 3 days vs. last month",
    icon: Clock,
  },
];

export function StatsOverview() {
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
          <CardContent>
            <p className="text-sm text-muted-foreground">{stat.detail}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
