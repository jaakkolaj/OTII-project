"use client";

import { formatBytes, toFileKey } from "../uploadUtils";

type UploadDetailsProps = {
  files: File[];
  errors: string[];
  totalSize: number;
  isSubmitting: boolean;
  onClearAll: () => void;
  onSubmit: () => void;
  onRemoveFile: (file: File) => void;
};

export function UploadDetails({
  files,
  errors,
  totalSize,
  isSubmitting,
  onClearAll,
  onSubmit,
  onRemoveFile,
}: UploadDetailsProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          {files.length === 0
            ? "No files selected yet."
            : `${files.length} file${files.length > 1 ? "s" : ""} • ${formatBytes(
                totalSize,
              )}`}
        </div>
        {files.length > 0 ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClearAll}
              className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
              Clear all
            </button>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary"
            >
              Upload Files
            </button>
          </div>
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
                onClick={() => onRemoveFile(file)}
                className="text-sm font-medium text-destructive transition hover:text-destructive/80"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
