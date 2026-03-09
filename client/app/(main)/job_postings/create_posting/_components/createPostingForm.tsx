"use client";

import { createJobPostingAction } from "../actions";
import JobPostingForm from "../../_components/JobPostingForm";

export default function CreatePostingForm() {
  return (
    <JobPostingForm
      action={createJobPostingAction}
      storageKey="JobPostingFields"
      successMessage="Job posting created successfully!"
      submitText="Create posting"
      loadingText="Creating"
    />
  );
}
