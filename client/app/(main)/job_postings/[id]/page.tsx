"use client";

import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { useParams } from "next/navigation";
import { JobPostingDetailHeader } from "./components/JobPostingDetailHeader";
import { UploadDetails } from "./components/UploadDetails";
import { UploadDropzone } from "./components/UploadDropzone";
import {
  ACCEPTED_EXTENSIONS,
  ACCEPTED_MIME_TYPES,
  MAX_FILE_SIZE_MB,
  toFileKey,
  validateFile,
} from "./uploadUtils";

// Job detail view with drag-and-drop CV upload and client-side validation.
export default function JobPostingDetail() {
  const params = useParams<{ id: string }>();
  const jobId = Array.isArray(params.id) ? params.id[0] : (params.id ?? "");
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Build the accept attribute once for both drag-drop and file picker.
  const accept = useMemo(() => {
    const extensions = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`);
    return [...ACCEPTED_MIME_TYPES, ...extensions].join(",");
  }, []);

  // Validate incoming files, collect errors, and dedupe accepted ones.
  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return;
    const incoming = Array.from(fileList);
    const nextErrors: string[] = [];
    const accepted: File[] = [];

    incoming.forEach((file) => {
      const result = validateFile(file);
      if (result.ok) {
        accepted.push(file);
      } else {
        nextErrors.push(`${file.name}: ${result.reason}`);
      }
    });

    setErrors(nextErrors);
    if (accepted.length === 0) return;

    setFiles((prev) => {
      const existingKeys = new Set(prev.map(toFileKey));
      const next = [...prev];
      accepted.forEach((file) => {
        const key = toFileKey(file);
        if (!existingKeys.has(key)) {
          next.push(file);
          existingKeys.add(key);
        }
      });
      return next;
    });
  };

  // Clear the input so the same file can be reselected after removal.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  // Drag-and-drop handlers keep the UI responsive and accessible.
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Support keyboard activation for the dropzone "button".
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const removeFile = (file: File) => {
    setFiles((prev) =>
      prev.filter((item) => toFileKey(item) !== toFileKey(file)),
    );
  };

  const clearAll = () => {
    setFiles([]);
    setErrors([]);
  };

  // Aggregate size shown in the summary line.
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (files.length === 0 || !jobId) return;

    try {
      const formData = new FormData();
      // Append jobPostingId for backend association
      formData.append("jobPostingId", jobId);

      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      // Successful upload results
      const data = await res.json();
      console.log("Upload success:", data);
      clearAll();
      alert(`Uploaded file(s) successfully`);
    } catch (error) {
      console.error("Upload error:", error);
      setErrors(["Failed to upload files. Please try again."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <main className="container mx-auto flex flex-col gap-8 p-8">
        <JobPostingDetailHeader jobId={jobId} />

        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <UploadDropzone
            accept={accept}
            inputRef={inputRef}
            isDragging={isDragging}
            maxFileSizeMb={MAX_FILE_SIZE_MB}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onKeyDown={handleKeyDown}
            onInputChange={handleInputChange}
          />

          <UploadDetails
            files={files}
            errors={errors}
            totalSize={totalSize}
            isSubmitting={isSubmitting}
            onClearAll={clearAll}
            onSubmit={handleSubmit}
            onRemoveFile={removeFile}
          />
        </section>
      </main>
  );
}
