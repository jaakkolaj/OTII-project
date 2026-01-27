"use client";

import { useMemo, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { useParams } from "next/navigation";

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_EXTENSIONS = ["pdf", "doc", "docx"];
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const toFileKey = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const validateFile = (file: File) => {
  const lowerName = file.name.toLowerCase();
  const extensionOk = ACCEPTED_EXTENSIONS.some((ext) =>
    lowerName.endsWith(`.${ext}`)
  );
  const mimeOk = ACCEPTED_MIME_TYPES.includes(file.type);
  if (!extensionOk && !mimeOk) {
    return {
      ok: false,
      reason: "Unsupported file type. Use PDF, DOC, or DOCX.",
    };
  }
  const maxBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return {
      ok: false,
      reason: `File is too large. Max ${MAX_FILE_SIZE_MB} MB.`,
    };
  }
  return { ok: true as const };
};

export default function JobPostingDetail() {
  const params = useParams<{ id: string }>();
  const jobId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const accept = useMemo(() => {
    const extensions = ACCEPTED_EXTENSIONS.map((ext) => `.${ext}`);
    return [...ACCEPTED_MIME_TYPES, ...extensions].join(",");
  }, []);

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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((item) => toFileKey(item) !== toFileKey(file)));
  };

  const clearAll = () => {
    setFiles([]);
    setErrors([]);
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);

  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Job Posting
        </p>
        <h1 className="text-3xl font-bold">Job Detail for ID: {jobId}</h1>
        <p className="max-w-2xl text-muted-foreground">
          Upload applicant CVs for this job posting. Drag and drop files below
          or browse from your computer.
        </p>
      </header>

      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/30 bg-muted/40 hover:border-muted-foreground/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Upload CVs by dropping files or browsing"
        >
          <div className="space-y-2">
            <p className="text-lg font-semibold">Drop CV files here</p>
            <p className="text-sm text-muted-foreground">
              PDF, DOC, or DOCX up to {MAX_FILE_SIZE_MB} MB each
            </p>
          </div>
          <span className="pointer-events-none rounded-full border px-4 py-2 text-sm font-medium transition hover:bg-muted">
            Browse files
          </span>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple
            className="hidden"
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground">
              {files.length === 0
                ? "No files selected yet."
                : `${files.length} file${files.length > 1 ? "s" : ""} • ${formatBytes(
                    totalSize
                  )}`}
            </div>
            {files.length > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {errors.length > 0 ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <ul className="list-disc space-y-1 pl-4">
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {files.length > 0 ? (
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={toFileKey(file)}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3"
                >
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file)}
                    className="text-sm font-medium text-destructive transition hover:text-destructive/80"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </main>
  );
}
