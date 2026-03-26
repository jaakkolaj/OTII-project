"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container mx-auto flex flex-col gap-6 p-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Resume Analyzer failed to load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          An unexpected error occurred while loading job postings.
        </p>
        <div className="mt-4 flex gap-3">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </section>
    </main>
  );
}
