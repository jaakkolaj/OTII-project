"use client";

import { Download, Eye, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResumeCandidate } from "../../types";
import { ScoreRing } from "./ScoreRing";
import { useState } from "react";

type CandidateCardProps = {
  candidate: ResumeCandidate;
};

export function CandidateCard({ candidate }: CandidateCardProps) {
  const [viewDocument, setViewDocument] = useState(false);

  const viewPDF = () => {
    setViewDocument(!viewDocument);
  };

  return (
    <div>
      <Card className="rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle className="text-base">Rank #{candidate.rank}</CardTitle>
          <div className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
            AI score {candidate.score}%
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
                {candidate.strengths.join(", ")}
              </div>
              <div>
                <span className="font-medium text-foreground">Weaknesses:</span>{" "}
                {candidate.weaknesses.join(", ")}
              </div>
              <div>
                <span className="font-medium text-foreground">Top skills:</span>{" "}
                {candidate.topSkills.join(", ")}
              </div>
            </div>
          </div>
          <ScoreRing score={candidate.score} />
        </CardContent>
        <CardFooter className="justify-between border-t">
          <Button variant="link" className="px-0">
            <Eye className="h-4 w-4" />
            View details
          </Button>
          <Button onClick={() => viewPDF()} disabled={!candidate.pdfUrl}>
            View PDF
          </Button>
          <Button variant="link" className="px-0">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </CardFooter>
      </Card>
      {viewDocument ? (
        <div className="mt-4 overflow-hidden rounded-2xl border bg-muted/20 p-2 shadow-sm">
          <iframe
            src={candidate.pdfUrl}
            title={`${candidate.name} resume preview`}
            loading="lazy"
            className="h-[480px] w-full rounded-xl border bg-background"
          />
        </div>
      ) : null}
    </div>
  );
}
