"use client";

import { editJobPostingAction } from "../actions";
import type { JobPosting } from "@/app/(main)/job_postings/_schemas/jobposting.schema";
import JobPostingForm from "../../../_components/JobPostingForm";
import { useLanguage } from "@/lib/language-provider";

type EditPostingFormProps = {
  initialJob: JobPosting;
};

export default function EditJobPostingForm({
  initialJob,
}: EditPostingFormProps) {
  const { t } = useLanguage();

  return (
    <JobPostingForm
      action={editJobPostingAction.bind(null, initialJob.id)}
      initialValues={initialJob}
      storageKey={`JobPostingFields-${initialJob.id}`}
      successMessage={t('jobPostings.createPage.buttons.updatePosting') + " " + t('messages.successfullySaved').toLowerCase() + "!"}
      submitText={t('jobPostings.createPage.buttons.updatePosting')}
      loadingText={t('jobPostings.createPage.buttons.updating')}
    />
  );
}