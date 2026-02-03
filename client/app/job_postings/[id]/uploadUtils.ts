export const MAX_FILE_SIZE_MB = 10;
export const ACCEPTED_EXTENSIONS = ["pdf", "docx"];
export const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

// Stable key for deduping and list rendering.
export const toFileKey = (file: File) =>
  `${file.name}-${file.size}-${file.lastModified}`;

// Convert raw bytes into a compact, human-readable label.
export const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Validate extension, MIME type, and size; return a reason for UI feedback.
export const validateFile = (file: File) => {
  const lowerName = file.name.toLowerCase();
  const extensionOk = ACCEPTED_EXTENSIONS.some((ext) =>
    lowerName.endsWith(`.${ext}`),
  );
  const mimeOk = ACCEPTED_MIME_TYPES.includes(file.type);
  if (!extensionOk && !mimeOk) {
    return {
      ok: false,
      reason: "Unsupported file type. Use PDF or DOCX.",
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
