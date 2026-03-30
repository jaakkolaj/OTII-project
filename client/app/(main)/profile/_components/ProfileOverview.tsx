"use client";

import { Briefcase, Calendar, ListTodo, Users } from "lucide-react";
import { FormEvent, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { changeEmailAction } from "@/app/(main)/profile/actions";
import { toast } from "sonner";
import { useLanguage } from "@/lib/language-provider";

type ProfileOverviewProps = {
  openJobPostings: number;
  totalCandidates: number;
  tasksCreatedLength: number;
  latestJobPostingCreatedAt: string;
};

export function ProfileOverview({
  openJobPostings,
  totalCandidates,
  tasksCreatedLength,
  latestJobPostingCreatedAt,
}: ProfileOverviewProps) {
  const emailFormRef = useRef<HTMLFormElement>(null);
  const [isEmailPending, startEmailTransition] = useTransition();

  const { t } = useLanguage();

  const workloadMetrics = [
    {
      label: t('profile.metrics.openJobPostings'),
      value: String(openJobPostings),
      icon: Briefcase,
    },
    {
      label: t('profile.metrics.totalCandidates'),
      value: String(totalCandidates),
      icon: Users,
    },
    {
      label: t('profile.metrics.tasksCreated'),
      value: String(tasksCreatedLength),
      icon: ListTodo,
    },
    {
      label: t('profile.metrics.latestJobPosting'),
      value: latestJobPostingCreatedAt,
      icon: Calendar,
    },
  ];

  const onEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startEmailTransition(async () => {
      const result = await changeEmailAction(formData);

      if (!result.success) {
        toast.error(t('profile.messages.emailChangeFailed'), {
          description: result.message,
        });
        return;
      }

      toast.success(t('profile.messages.emailUpdated'), {
        description: result.message,
      });
      emailFormRef.current?.reset();
    });
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg">{t('profile.overview.title')}</CardTitle>
        <CardDescription>
          {t('profile.overview.description')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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

        <div className="rounded-xl border bg-muted/30 p-4">
          <form ref={emailFormRef} onSubmit={onEmailSubmit}>
            <Field>
              <FieldLabel htmlFor="profile-overview-email">{t('profile.emailChange.change')}</FieldLabel>
              <Input
                id="profile-overview-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t('profile.emailChange.placeholder')}
              />
              <FieldDescription>
                {t('profile.emailChange.description')}
              </FieldDescription>
            </Field>
            <div className="mt-3 flex justify-end">
              <Button type="submit" size="sm" disabled={isEmailPending}>
                {isEmailPending ? t('profile.emailChange.updating') : t('profile.emailChange.updateButton')}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

