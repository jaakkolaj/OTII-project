import type { ResumeCandidate } from "../types";
import { getAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";
import { getSignedURL } from "@/app/services/supaBaseService";

export async function getMappedCandidates(
  jobId: string,
  jobTitle: string,
): Promise<ResumeCandidate[]> {
  const response = await getAiAnalysisByJobPostingId(jobId);
  const data = Array.isArray(response) ? response : response?.data || [];

  return Promise.all(
    data.map(async (analysis: any, index: number) => {
      let pdfUrl = "";

      try {
        if (analysis.candidate_id) {
          pdfUrl = (await getSignedURL(analysis.candidate_id)) || "";
        }
      } catch {
        // Signed URL failure should not break rendering candidate cards.
      }

      return {
        id: analysis.id || analysis.candidate_id || String(index),
        name: analysis.name || "Unknown",
        email: analysis.email || "",
        phone: analysis.phone || "",
        position: jobTitle,
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        score: analysis.score ?? 0,
        topSkills: analysis.skills || [],
        pdfUrl,
        rank: index + 1,
      };
    }),
  );
}
