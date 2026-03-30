"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase } from "lucide-react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import FormSubmitButton from "@/components/ui-build/formSubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormErrors, FormState } from "@/lib/forms/types";
import type { CreateJobPostingInput } from "@/app/(main)/job_postings/_schemas/jobposting.schema";
import { useLanguage } from "@/lib/language-provider";

type JobPostingFormProps = {
  action: (
    prevState: FormState<CreateJobPostingInput>,
    formData: FormData,
  ) => Promise<FormState<CreateJobPostingInput>>;
  initialValues?: Partial<CreateJobPostingInput>;
  storageKey: string;
  successMessage: string;
  submitText: string;
  loadingText: string;
};

// A reusable form component for creating and editing job postings. It manages form state, validation errors,
export default function JobPostingForm({
  action,
  initialValues,
  storageKey,
  successMessage,
  submitText,
  loadingText,
}: JobPostingFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [state, formAction] = useActionState(action, null);

  // Use local storage to persist form fields, allowing users to navigate away and return without losing their input.
  const [savedFields, setSavedFields, removeFields] = useLocalStorage<
    Partial<CreateJobPostingInput>
  >(storageKey, initialValues ?? {});

  
  const [localErrors, setLocalErrors] = useState<
    FormErrors<CreateJobPostingInput> | undefined
  >();

  // When the form state changes (e.g., after submission), update local errors and handle success case.
  useEffect(() => {
    setLocalErrors(state?.errors);
    if (state?.success) {
      removeFields();
      toast.success(successMessage);
      router.push("/job_postings");
    } else if (state?.fields) {
      setSavedFields(state.fields);
    }
  }, [state, router, setSavedFields, removeFields, successMessage]);


  // Handle changes to form fields, updating local state and clearing errors for the field.
  const handleFieldChange = (
    field: keyof CreateJobPostingInput,
    value: string,
  ) => {
    setSavedFields((prev) => ({ ...prev, [field]: value }));
    if (localErrors?.[field]) {
      setLocalErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form action={formAction} className="space-y-6" noValidate>
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </span>
            <div>
              <CardTitle>{t('jobPostings.createPage.roleDetails.title')}</CardTitle>
              <CardDescription>
                {t('jobPostings.createPage.roleDetails.description')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="title">
                {t('jobPostings.createPage.form.jobTitle')} <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={savedFields.title || ""}
                placeholder={t('jobPostings.createPage.form.jobTitlePlaceholder')}
                required
                aria-invalid={!!localErrors?.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />

              <FieldError errors={localErrors?.title} />
            </Field>

            <Field>
              <FieldLabel htmlFor="department">{t('jobPostings.createPage.form.department')}</FieldLabel>
              <Input
                id="department"
                name="department"
                defaultValue={savedFields.department}
                placeholder={t('jobPostings.createPage.form.departmentPlaceholder')}
                onChange={(e) => handleFieldChange("department", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">{t('jobPostings.createPage.form.location')}</FieldLabel>
              <Input
                id="location"
                name="location"
                defaultValue={savedFields.location}
                placeholder={t('jobPostings.createPage.form.locationPlaceholder')}
                onChange={(e) => handleFieldChange("location", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="employmentType">{t('jobPostings.createPage.form.employmentType')}</FieldLabel>
              <Select
                name="employmentType"
                defaultValue={savedFields.employmentType || "full-time"}
                onValueChange={(value) => handleFieldChange("employmentType", value)}
              >
                <SelectTrigger id="employmentType" className="w-full">
                  <SelectValue placeholder={t('jobPostings.createPage.form.selectType')} />
                </SelectTrigger>
                <SelectContent id="employmentType-content">
                  <SelectItem value="full-time">{t('jobPostings.createPage.form.fullTime')}</SelectItem>
                  <SelectItem value="part-time">{t('jobPostings.createPage.form.partTime')}</SelectItem>
                  <SelectItem value="contract">{t('jobPostings.createPage.form.contract')}</SelectItem>
                  <SelectItem value="internship">{t('jobPostings.createPage.form.internship')}</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="seniority">{t('jobPostings.createPage.form.seniority')}</FieldLabel>
              <Select
                name="seniority"
                defaultValue={savedFields.seniority || "mid"}
                onValueChange={(value) => handleFieldChange("seniority", value)}
              >
                <SelectTrigger id="seniority" className="w-full">
                  <SelectValue placeholder={t('jobPostings.createPage.form.selectSeniority')} />
                </SelectTrigger>
                <SelectContent id="seniority-content">
                  <SelectItem value="junior">{t('jobPostings.createPage.form.junior')}</SelectItem>
                  <SelectItem value="mid">{t('jobPostings.createPage.form.mid')}</SelectItem>
                  <SelectItem value="senior">{t('jobPostings.createPage.form.senior')}</SelectItem>
                  <SelectItem value="lead">{t('jobPostings.createPage.form.lead')}</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="salaryRange">{t('jobPostings.createPage.form.salaryRange')}</FieldLabel>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder={t('jobPostings.createPage.form.salaryPlaceholder')}
                defaultValue={savedFields.salaryRange}
                onChange={(e) => handleFieldChange("salaryRange", e.target.value)}
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="description">{t('jobPostings.createPage.form.roleDescription')}<span className="text-destructive">*</span></FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder={t('jobPostings.createPage.form.roleDescriptionPlaceholder')}
                className="min-h-35"
                required
                aria-invalid={!!localErrors?.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                defaultValue={savedFields.description}
              />
              <FieldError errors={localErrors?.description} />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="requirements">{t('jobPostings.createPage.form.requirements')}</FieldLabel>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder={t('jobPostings.createPage.form.requirementsPlaceholder')}
                className="min-h-30"
                defaultValue={savedFields.requirements}
                onChange={(e) => handleFieldChange("requirements", e.target.value)}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t('jobPostings.createPage.publishing.title')}</CardTitle>
          <CardDescription>
            {t('jobPostings.createPage.publishing.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="max-w-xs">
            <FieldLabel htmlFor="closingDate">{t('jobPostings.createPage.form.closingDate')}</FieldLabel>
            <Input
              id="closingDate"
              type="date"
              name="closingDate"
              defaultValue={savedFields.closingDate}
              onChange={(e) => handleFieldChange("closingDate", e.target.value)}
            />
          </Field>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Button asChild variant="outline" size="lg">
          <Link href="/job_postings">{t('jobPostings.createPage.buttons.cancel')}</Link>
        </Button>
        <FormSubmitButton text={submitText} loadingText={loadingText} size="lg" />
      </div>
    </form>
  );
}