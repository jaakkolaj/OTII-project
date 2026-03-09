"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase} from "lucide-react";
import FormSubmitButton from "@/components/ui-build/formSubmitButton";
import { createJobPostingAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormErrors } from "@/lib/form-utils";
import { useLocalStorage } from "usehooks-ts";
import { CreateJobPostingInput } from "@/app/types/jobPosting";

export default function CreatePostingForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(createJobPostingAction, {});
  //local storage to save form fields in case of validation errors or accidental navigation away from the page.
  // This allows us to restore the user's input when they return to the form.
  const [savedFields, setSavedFields, removeFields] = useLocalStorage<
    Partial<CreateJobPostingInput>
  >("JobPostingFields", {});

  // Local state to manage form errors, initialized from the action state.
  const [localErrors, setLocalErrors] = useState<
    FormErrors<CreateJobPostingInput> | undefined
  >();

  // Sync form state with local storage and handle success or error states.
  useEffect(() => {
    setLocalErrors(state?.errors);
    if (state?.success) {
      removeFields();
      toast.success("Job posting created successfully!");
      router.push("/job_postings");
    } else if (state?.fields) {
      setSavedFields(state.fields);
    }
  }, [state, router, setSavedFields, removeFields]);

  // Handle changes to form fields, updating local storage and clearing errors for the field.
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
                onChange={(e) =>
                  handleFieldChange("department", e.target.value)
                }
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
                onValueChange={(value) =>
                  handleFieldChange("employmentType", value)
                }
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
                defaultValue={savedFields.seniority || "mid"}
                onValueChange={(value) => handleFieldChange("seniority", value)}
              >
                <SelectTrigger id="seniority" className="w-full">
                  <SelectValue placeholder="Select seniority" />
                </SelectTrigger>
                <SelectContent id="seniority-content">
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
                onChange={(e) =>
                  handleFieldChange("salaryRange", e.target.value)
                }
              />
            </Field>

            <Field className="md:col-span-2">
              <FieldLabel htmlFor="description">Role description</FieldLabel>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role, team, and main responsibilities."
                className="min-h-35"
                required
                aria-invalid={!!localErrors?.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
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
                onChange={(e) =>
                  handleFieldChange("requirements", e.target.value)
                }
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
        <FormSubmitButton
          text="Create posting"
          loadingText="Creating"
          size="lg"
        />
      </div>
    </form>
  );
}
