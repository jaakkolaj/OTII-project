"use client";

import Link from "next/link";
import { Eye, Briefcase, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResumeJobPosting } from "../types";

type JobPostingCardProps = {
  posting: ResumeJobPosting;
};

export function JobPostingCard({ posting }: JobPostingCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border bg-muted">
            <Briefcase className="h-5 w-5 text-muted-foreground" />
          </span>
          <div className="space-y-1">
            <CardTitle className="text-base">{posting.title}</CardTitle>
            <CardDescription>{posting.description}</CardDescription>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {posting.status && (
                <span className="rounded-full bg-muted px-2 py-0.5">
                  {posting.status}
                </span>
              )}
              <span>{posting.location}</span>
              {posting.lastUpdated && <span>Updated {posting.lastUpdated}</span>}
            </div>
          </div>
        </div>
        {typeof posting.applicants === "number" && (
          <div className="text-sm font-medium text-muted-foreground">
            Applicants: {posting.applicants}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-px w-full bg-border" />
      </CardContent>
      <CardFooter className="justify-between">
        <Button asChild variant="link" className="px-0">
          <Link href={`/resumeAnalyzer/${posting.id}`}>
            <Eye className="h-4 w-4" />
            View candidates
          </Link>
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Delete posting">
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
