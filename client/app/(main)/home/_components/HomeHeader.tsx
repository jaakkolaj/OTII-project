"use client";

import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-provider";

export function HomeHeader() {
  const { t } = useLanguage();

  return (
    <header className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          {t('home.title')}
        </p>
        <h1 className="text-3xl font-bold">{t('home.subtitle')}</h1>
        <p className="max-w-2xl text-muted-foreground">
          {t('home.description')}
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg">
            <Link href="/job_postings/create_posting">{t('home.createJobPosting')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/job_postings">
              {t('home.viewAllRoles')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
