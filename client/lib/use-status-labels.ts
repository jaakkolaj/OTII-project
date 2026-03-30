"use client";

import { useLanguage } from "./language-provider";
import type { CandidateStatus } from "@/app/(main)/resumeAnalyzer/types";

export function useStatusLabels() {
  const { t } = useLanguage();

  const getStatusLabel = (status: CandidateStatus): string => {
    return t(`dashboard.statuses.${status}`);
  };

  const getStatusLabels = (): Record<CandidateStatus, string> => {
    return {
      NEW: t('dashboard.statuses.NEW'),
      SCREENING: t('dashboard.statuses.SCREENING'),
      INTERVIEW: t('dashboard.statuses.INTERVIEW'),
      OFFER: t('dashboard.statuses.OFFER'),
      ACCEPTED: t('dashboard.statuses.ACCEPTED'),
      REJECTED: t('dashboard.statuses.REJECTED'),
    };
  };

  return { getStatusLabel, getStatusLabels };
}
