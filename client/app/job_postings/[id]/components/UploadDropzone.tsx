"use client";

import type {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  RefObject,
} from "react";

type UploadDropzoneProps = {
  accept: string;
  inputRef: RefObject<HTMLInputElement | null>;
  isDragging: boolean;
  maxFileSizeMb: number;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function UploadDropzone({
  accept,
  inputRef,
  isDragging,
  maxFileSizeMb,
  onDrop,
  onDragOver,
  onDragLeave,
  onKeyDown,
  onInputChange,
}: UploadDropzoneProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
        isDragging
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/30 bg-muted/40 hover:border-muted-foreground/50"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => inputRef.current?.click()}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload CVs by dropping files or browsing"
    >
      <div className="space-y-2">
        <p className="text-lg font-semibold">Drop CV files here</p>
        <p className="text-sm text-muted-foreground">
          PDF, DOC, or DOCX up to {maxFileSizeMb} MB each
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
        onChange={onInputChange}
      />
    </div>
  );
}
