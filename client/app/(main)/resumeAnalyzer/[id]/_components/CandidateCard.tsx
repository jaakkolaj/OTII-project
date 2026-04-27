"use client";

import Link from "next/link";
import { Download, Eye, Mail, Phone, User, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CandidateStatus, ResumeCandidate } from "../../types";
import { ScoreRing } from "./ScoreRing";
import { useState, useTransition } from "react";
import { updateCandidateStatusAction } from "../actions";

const STATUS_LABELS: Record<CandidateStatus, string> = {
  NEW: "Uusi",
  SCREENING: "Esikarsinta",
  INTERVIEW: "Haastattelu",
  OFFER: "Tarjous",
  ACCEPTED: "Hyväksytty",
  REJECTED: "Hylätty",
};

type CandidateCardProps = {
  candidate: ResumeCandidate;
  jobId: string;
};

export function CandidateCard({ candidate, jobId }: CandidateCardProps) {
  const [viewDocument, setViewDocument] = useState(false);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: CandidateStatus) => {
    startTransition(async () => {
      await updateCandidateStatusAction(candidate.id, status, jobId);
    });
  };

  const viewFile = async () => {
    if (iframeSrc) {
      setViewDocument(!viewDocument);
      return;
    }

    setIsLoading(true);
    setViewDocument(true);

    try {
      const res = await fetch(candidate.pdfUrl!);
      const data = await res.json();
      const url: string | undefined = data.url;

      if (!url) {
        setIsLoading(false);
        setViewDocument(false);
        return;
      }

      // Tunnista tiedostotyyppi URL:n polusta
      const ext = url.split("?")[0].split(".").pop()?.toLowerCase();

      if (ext === "docx" || ext === "doc") {
        // Microsoft Office Online viewer DOCX:lle
        setIframeSrc(
          `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`
        );
      } else {
        // PDF suoraan
        setIframeSrc(url);
      }
    } catch (error) {
      console.error("Tiedoston haku epäonnistui:", error);
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      // Haetaan aina tuore signed URL jotta ei käytetä vanhentunutta
      const res = await fetch(candidate.pdfUrl!);
      const data = await res.json();
      const url: string = data.url;

      const ext = url.split("?")[0].split(".").pop()?.toLowerCase() ?? "pdf";

      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${candidate.name}_CV.${ext}`;
      a.click();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("Tiedoston lataus epäonnistui:", error);
    }
  };

  return (
    <div>
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle className="text-base">Rank #{candidate.rank}</CardTitle>
          <div className="flex items-center gap-3">
            <Select
              value={candidate.status}
              onValueChange={(v) => handleStatusChange(v as CandidateStatus)}
              disabled={isPending}
            >
              <SelectTrigger className="h-7 w-36 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(STATUS_LABELS) as CandidateStatus[]).map((s) => (
                  <SelectItem key={s} value={s} className="text-xs">
                    {STATUS_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              AI score {candidate.score}%
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[2fr_auto]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-2 font-semibold">
                <User className="h-4 w-4 text-muted-foreground" />
                {candidate.name}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {candidate.phone}
              </span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {candidate.email}
              </span>
            </div>

            <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <div>
                <span className="font-medium text-foreground">
                  Position applied for:
                </span>{" "}
                {candidate.position}
              </div>
              <div>
                <span className="font-medium text-foreground">Strengths:</span>{" "}
                {(candidate.strengths || []).join(", ") || "N/A"}
              </div>
              <div>
                <span className="font-medium text-foreground">Weaknesses:</span>{" "}
                {(candidate.weaknesses || []).join(", ") || "N/A"}
              </div>
              <div>
                <span className="font-medium text-foreground">Top skills:</span>{" "}
                {(candidate.topSkills || []).join(", ") || "N/A"}
              </div>
            </div>
          </div>
          <ScoreRing score={candidate.score} />
        </CardContent>
        <CardFooter className="justify-between border-t">
          <Button variant="link" className="px-0" asChild>
            <Link href={`/candidates/${candidate.id}`}>
              <Eye className="h-4 w-4" />
              View details
            </Link>
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => viewFile()}
            disabled={!candidate.pdfUrl || (isLoading && !iframeSrc)}
          >
            {isLoading && !iframeSrc ? "Loading..." : viewDocument ? "Hide file" : "View file"}
          </Button>
          <Button variant="link" className="px-0" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>
      {viewDocument && (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-muted/20 p-2 shadow-sm min-h-[480px] flex items-center justify-center relative">
          {isLoading && (
            <div className="flex flex-col items-center gap-3 z-10">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                loading document...
              </p>
            </div>
          )}
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              title={`${candidate.name} resume preview`}
              onLoad={() => setIsLoading(false)}
              className={`h-[480px] w-full rounded-xl border bg-background transition-opacity duration-300 ${
                isLoading ? "opacity-0 absolute" : "opacity-100 relative"
              }`}
            />
          )}
        </div>
      )}
    </div>
  );
}
