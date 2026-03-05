
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreatePostingForm from "./_components/createPostingForm";

export default function CreateJobPostingPage() {
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
        <h1 className="text-3xl font-bold">Create a new job posting</h1>
        <p className="max-w-2xl text-muted-foreground">
          Fill in the details below. You can edit the posting later or add
          applicant criteria once it is saved.
        </p>
      </header>
      <CreatePostingForm />
    </main>
  );
}
