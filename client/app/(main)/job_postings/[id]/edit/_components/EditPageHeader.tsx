"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language-provider";

export default function EditPageHeader() {
  const { t } = useLanguage();

  return (
    <header className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Link
          href="/job_postings"
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('jobPostings.editPage.backToJobPostings')}
        </Link>
      </div>
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        {t('jobPostings.title')}
      </p>
      <h1 className="text-3xl font-bold">{t('jobPostings.editPage.pageTitle')}</h1>
      <p className="max-w-2xl text-muted-foreground">
        {t('jobPostings.editPage.pageDescription')}
      </p>
    </header>
  );
}