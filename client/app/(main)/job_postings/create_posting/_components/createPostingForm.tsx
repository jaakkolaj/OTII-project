"use client";

import { createJobPostingAction } from "../actions";
import JobPostingForm from "../../_components/JobPostingForm";
import { useLanguage } from "@/lib/language-provider";

export default function CreatePostingForm() {
  const { t } = useLanguage();

  return (
    <JobPostingForm
      action={createJobPostingAction}
      storageKey="JobPostingFields"
      successMessage={t('jobPostings.createPage.buttons.createPosting') + " " + t('messages.successfullySaved').toLowerCase() + "!"}
      submitText={t('jobPostings.createPage.buttons.createPosting')}
      loadingText={t('jobPostings.createPage.buttons.creating')}
    />
  );
}
