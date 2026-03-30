"use client";

import { Briefcase, Calendar, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/lib/language-provider";

type StatsOverviewClientProps = {
  stats: {
    openRoles: number;
    candidatesInReview: number;
    interviewsScheduled: number;
  };
};

export function StatsOverviewClient({ stats }: StatsOverviewClientProps) {
  const { t } = useLanguage();

  const items = [
    {
      label: t("home.openRoles"),
      value: stats.openRoles,
      icon: Briefcase,
    },
    {
      label: t("home.candidatesInReview"),
      value: stats.candidatesInReview,
      icon: Users,
    },
    {
      label: t("home.interviewsScheduled"),
      value: stats.interviewsScheduled,
      icon: Calendar,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div className="space-y-1">
              <CardDescription>{item.label}</CardDescription>
              <CardTitle className="text-2xl">{item.value}</CardTitle>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <item.icon className="h-5 w-5 text-muted-foreground" />
            </span>
          </CardHeader>
        </Card>
      ))}
    </section>
  );
}
