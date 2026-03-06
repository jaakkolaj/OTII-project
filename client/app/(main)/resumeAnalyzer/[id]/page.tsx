import { getAiAnalysisByJobPostingId } from "@/app/services/aiAnalysisService";
import { getSignedURL } from "@/app/services/supaBaseService";
import ResumeAnalyzerClient from "./_components/ResumeAnalyzerManager";

// Aputoiminto datan hakemiseen palvelimella
async function getMappedCandidates(jobId: string, jobTitle: string) {

  const response = await getAiAnalysisByJobPostingId(jobId);
  const data = Array.isArray(response) ? response : response?.data || [];
  // Mapataan data haluttuun muotoon, ja haetaan samalla PDF-tiedostojen signed URL:t
  return await Promise.all(
    data.map(async (analysis: any, index: number) => {
      let pdfUrl = "";
      try {
        if (analysis.candidate_id) {
          pdfUrl = (await getSignedURL(analysis.candidate_id)) || "";
        }
      } catch (e) {
        console.error(
          `Failed to get URL for candidate ${analysis.candidate_id}`,
        );
      }
      return {
        id: analysis.candidate_id || String(index),
        name: analysis.name,
        email: analysis.email,
        position: jobTitle,
        strengths: analysis.strengths || [],
        weaknesses: analysis.weaknesses || [],
        score: analysis.score ?? 0,
        topSkills: analysis.skills || [],
        pdfUrl: pdfUrl,
        rank: index + 1,
        status: analysis.status ?? "NEW",
      };
    }),
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: jobId } = await params;
  const jobTitle = "Selected role";

  const initialCandidates = await getMappedCandidates(jobId, jobTitle);
  return (
    <ResumeAnalyzerClient
      jobId={jobId}
      jobTitle={jobTitle}
      initialCandidates={initialCandidates}
    />
  );
}
