"use client";

import { useLanguage } from "@/lib/language-provider";

type PipelinePageHeaderProps = {
  candidatesCount: number;
};

export function PipelinePageHeader({ candidatesCount }: PipelinePageHeaderProps) {
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="text-2xl font-bold">{t('sidebar.pipeline')}</h1>
      <p className="text-sm text-muted-foreground">
        {candidatesCount} {t('dashboard.pipeline.candidatesCount')}
      </p>
    </div>
  );
}
