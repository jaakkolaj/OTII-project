import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function HomeHeader() {
  return (
    <header className="flex flex-col gap-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          ATS Home
        </p>
        <h1 className="text-3xl font-bold">Recruiting command center</h1>
        <p className="max-w-2xl text-muted-foreground">
          Monitor open roles, review candidates, and drive hiring decisions from one command center.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <Button asChild size="lg">
            <Link href="/job_postings/create_posting">Create job posting</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/job_postings">
              View all roles
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
