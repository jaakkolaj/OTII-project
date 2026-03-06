"use server";

import { revalidatePath } from "next/cache";
import {deleteJobPosting} from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/require-auth";

// Server action, joka poistaa työpaikkailmoituksen ja uudelleenrevalidatoi kyseisen polun, 
// jotta muutokset näkyvät välittömästi käyttöliittymässä.
export async function deleteJobPostingAction(jobId: string) {
  await requireAuth(() => deleteJobPosting(jobId));
  revalidatePath(`/job_postings/`);
}