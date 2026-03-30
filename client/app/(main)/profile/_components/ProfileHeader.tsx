"use client";

import { useLanguage } from "@/lib/language-provider";

export function ProfileHeader() {
  const { t } = useLanguage();

  return (
    <header className="space-y-2">
      <p className="text-sm uppercase tracking-widest text-muted-foreground">
        {t('profile.title')}
      </p>
      <h1 className="text-3xl font-bold">{t('profile.subtitle')}</h1>
      <p className="max-w-2xl text-muted-foreground">{t('profile.description')}</p>
    </header>
  );
}
