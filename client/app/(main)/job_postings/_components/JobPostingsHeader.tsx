"use client";

import { useLanguage } from "@/lib/language-provider";

export function JobPostingsHeader() {
  const { t } = useLanguage();

  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        {t('jobPostings.title')}
      </p>
      <h1 className="text-3xl font-bold">{t('jobPostings.subtitle')}</h1>
      <p className="max-w-2xl text-muted-foreground">
        {t('jobPostings.description')}
      </p>
    </header>
  );
}
