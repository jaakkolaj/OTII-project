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
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-semibold">Create posting failed</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The create posting page could not be loaded.
        </p>
        <div className="mt-4">
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </section>
    </main>
  );
}
