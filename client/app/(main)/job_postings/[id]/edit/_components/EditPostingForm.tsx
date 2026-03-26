"use client";

import { editJobPostingAction } from "../actions";
import { JobPosting } from "@/app/types/jobPosting";
import JobPostingForm from "../../../_components/JobPostingForm";

type EditPostingFormProps = {
  initialJob: JobPosting;
};

export default function EditJobPostingForm({
  initialJob,
}: EditPostingFormProps) {
  return (
    <JobPostingForm
      action={editJobPostingAction.bind(null, initialJob.id)}
      initialValues={initialJob}
      storageKey={`JobPostingFields-${initialJob.id}`}
      successMessage="Job posting updated successfully!"
      submitText="Save changes"
      loadingText="Saving"
    />
  );
}