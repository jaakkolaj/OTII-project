"use client";

import { useLanguage } from "@/lib/language-provider";

type ResumeAnalyzerHeaderProps = {
  total: number;
};

export function ResumeAnalyzerHeader({ total }: ResumeAnalyzerHeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        {t('dashboard.resumeAnalyzer.title')}
      </p>
      <h1 className="text-3xl font-bold">{t('dashboard.resumeAnalyzer.description')}</h1>
      <p className="max-w-2xl text-muted-foreground">
        {t('dashboard.resumeAnalyzer.subtitle')}
      </p>
      <p className="text-sm text-muted-foreground">
        {total} {t('dashboard.resumeAnalyzer.jobPostingsAvailable')}
      </p>
    </header>
  );
}
