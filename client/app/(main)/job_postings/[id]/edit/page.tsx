import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJobPostingById } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/auth/require-auth";
import EditPostingForm from "./_components/EditPostingForm";
import EditPageHeader from "./_components/EditPageHeader";

export default async function EditJobPostingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const job = await requireAuth(() => getJobPostingById(jobId));


  return (
    <main className="container mx-auto flex flex-col gap-8 p-8">
      <EditPageHeader />
      <EditPostingForm initialJob={job} />
    </main>
  );
}
