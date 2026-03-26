"use client";

import { useState } from "react";
import { FileText, Download, Loader2 } from "lucide-react";

type Props = {
  candidateId: string;
  filename: string;
  documentType: string;
  fileType: string;
};

export function DocumentDownload({ candidateId, filename, documentType, fileType }: Props) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5001/supabase/${candidateId}`);
      const data = await res.json();
      const url: string = data.url;

      const file = await fetch(url);
      const blob = await file.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // silently fail — user can retry
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-3 rounded-xl border p-3 text-sm hover:bg-muted/50 transition-colors w-full text-left disabled:opacity-60"
    >
      <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="flex flex-col min-w-0 flex-1">
        <span className="truncate font-medium">{filename}</span>
        <span className="text-xs text-muted-foreground uppercase">
          {documentType} · {fileType}
        </span>
      </div>
      {loading ? (
        <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
      ) : (
        <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
    </button>
  );
}
