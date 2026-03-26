"use server";

import { revalidatePath } from "next/cache";
import { deleteJobPosting } from "@/app/services/jobPostingService";
import { requireAuth } from "@/lib/require-auth";
import { success } from "zod";

// Server action, joka poistaa työpaikkailmoituksen ja uudelleenrevalidatoi kyseisen polun,
// jotta muutokset näkyvät välittömästi käyttöliittymässä.

export type DeleteState = {
  success: boolean;
  message: string;
};
// Server action to handle the deletion of a job posting. It checks for authentication,
// deletes the job posting, and revalidates the job postings page to reflect the changes.
export async function deleteJobPostingAction(
  _prevState: DeleteState,
  jobId: string,
): Promise<DeleteState> {

  try {
    await requireAuth(() => deleteJobPosting(jobId));
    revalidatePath(`/job_postings/`);
    return { success: true, message: "Työpaikka poistettu" };
  } catch (error) {
    return { success: false, message: "Poisto epäonnistui" };
  }
}
