"use client";

import Link from "next/link";
import { ArrowUpRight, Briefcase, FileText, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/lib/language-provider";
import { TaskListManager } from "./TaskListManager";

type Task = {
  id: string;
  task_text: string;
};

type PipelineFocusSectionClientProps = {
  tasks: Task[];
};

export function PipelineFocusSectionClient({ tasks }: PipelineFocusSectionClientProps) {
  const { t } = useLanguage();

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{t('home.todaysFocus')}</CardTitle>
          <CardDescription>{t('home.prioritizedTasks')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <TaskListManager initialTasks={tasks} />
        </CardContent>
      </Card>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">{t('home.quickActions')}</CardTitle>
          <CardDescription>{t('home.jumpToWork')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Button asChild variant="secondary" className="justify-between">
            <Link href="/job_postings">
              <span className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                {t('home.openJobPostings')}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/resumeAnalyzer">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('dashboard.resumeAnalyzer.title')}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/profile">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('sidebar.profile')}
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
