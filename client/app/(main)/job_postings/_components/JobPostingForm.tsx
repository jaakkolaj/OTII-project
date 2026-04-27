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
              <CardTitle>Role details</CardTitle>
              <CardDescription>
                These fields appear on the job posting page.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <FieldGroup className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="title">
                Job title <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                id="title"
                name="title"
                defaultValue={savedFields.title || ""}
                placeholder="e.g. Backend Developer"
                required
                aria-invalid={!!localErrors?.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />

              <FieldError errors={localErrors?.title} />
            </Field>

            <Field>
              <FieldLabel htmlFor="department">Department</FieldLabel>
              <Input
                id="department"
                name="department"
                defaultValue={savedFields.department}
                placeholder="Engineering"
                onChange={(e) => handleFieldChange("department", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <Input
                id="location"
                name="location"
                defaultValue={savedFields.location}
                placeholder="Helsinki, Hybrid"
                onChange={(e) => handleFieldChange("location", e.target.value)}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="employmentType">Employment type</FieldLabel>
              <Select
                name="employmentType"
                defaultValue={savedFields.employmentType || "full-time"}
                onValueChange={(value) => handleFieldChange("employmentType", value)}
              >
                <SelectTrigger id="employmentType" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent id="employmentType-content">
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
                <FieldLabel htmlFor="seniority">Seniority</FieldLabel>
                <Select
                  name="seniority"
                  defaultValue={savedFields.seniority || "none"}
                  onValueChange={(value) => handleFieldChange("seniority", value)}
                >
                  <SelectTrigger id="seniority" className="w-full">
                    <SelectValue placeholder="Seniority" />
                  </SelectTrigger>
                  <SelectContent id="seniority-content">
                    <SelectItem value="none">-</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="mid">Mid-level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

            <Field>
              <FieldLabel htmlFor="salaryRange">Salary range</FieldLabel>
              <Input
                id="salaryRange"
                name="salaryRange"
                placeholder="EUR 3,500 - EUR 5,500"
                defaultValue={savedFields.salaryRange}
                onChange={(e) => handleFieldChange("salaryRange", e.target.value)}
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="description">Role description<span className="text-destructive">*</span></FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role, team, and main responsibilities."
                className="min-h-35"
                required
                aria-invalid={!!localErrors?.description}
                onChange={(e) => handleFieldChange("description", e.target.value)}
                defaultValue={savedFields.description}
              />
              <FieldError errors={localErrors?.description} />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="requirements">Requirements</FieldLabel>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="Key skills, technologies, or experience needed."
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
          <CardTitle>Publishing</CardTitle>
          <CardDescription>
            Choose when to close applications or leave it open-ended.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field className="max-w-xs">
            <FieldLabel htmlFor="closingDate">Closing date</FieldLabel>
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
          <Link href="/job_postings">Cancel</Link>
        </Button>
        <FormSubmitButton text={submitText} loadingText={loadingText} size="lg" />
      </div>
    </form>
  );
}