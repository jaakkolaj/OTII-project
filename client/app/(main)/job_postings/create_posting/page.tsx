
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreatePostingForm from "./_components/createPostingForm";
import { useLanguage } from "@/lib/language-provider";

export default function CreateJobPostingPage() {
  const { t } = useLanguage();

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <header className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link
            href="/job_postings"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('jobPostings.createPage.backToJobPostings')}
          </Link>
        </div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {t('jobPostings.title')}
        </p>
        <h1 className="text-3xl font-bold">{t('jobPostings.createPage.pageTitle')}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {t('jobPostings.createPage.pageDescription')}
        </p>
      </header>
        <CreatePostingForm />
    </main>
  );
}
