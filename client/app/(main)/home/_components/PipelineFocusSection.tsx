import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Activity,
  ArrowUpRight,
  Briefcase,
  FileText,
  User
} from "lucide-react";
import { requireAuth } from "@/lib/auth/require-auth";
import { getTasks } from "@/app/services/homePageService";
import { TaskListManager } from "./TaskListManager";

export async function PipelineFocusSection() {
  const tasks = await requireAuth(() => getTasks());

  return (
    <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Today&apos;s focus</CardTitle>
          <CardDescription>Prioritized recruiter tasks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <TaskListManager initialTasks={tasks} />
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
            <Link href="/resumeAnalyzer">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume analyzer
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/profile">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
