import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJobPostingById } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/require-auth";
import EditPostingForm from "./_components/EditPostingForm";

export default async function EditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const job = await requireAuth(() => getJobPostingById(jobId));

  
  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <header className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link
            href="/job_postings"
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1 transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to job postings
          </Link>
        </div>
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          Job Postings
        </p>
        <h1 className="text-3xl font-bold">Edit job posting</h1>
        <p className="max-w-2xl text-muted-foreground">
          Update role details and publishing options.
        </p>
      </header>

      <EditPostingForm initialJob={job} />
    </main>
  );
}
