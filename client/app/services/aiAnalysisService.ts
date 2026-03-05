import "server-only";

const baseUrl = "http://localhost:5001/aiAnalysis";
import { authFetch } from "@/lib/authFetch";

// Service funktio, joka hakee yhden kandidaatin ja sen analyysin ID:n perusteella.
export const getAiAnalysisById = async (analysisId: string) => {
  const response = await authFetch(`${baseUrl}/candidate/${analysisId}`, {
    method: "GET",
  });
  if (!response.ok) throw new Error(`Haku epäonnistui: ${response.status}`);

  return response.json();
};

// Service funktio, joka hakee kaikki analyysit yhdestä jobPostingista.
export const getAiAnalysisByJobPostingId = async (jobId: string) => {
  const response = await authFetch(`${baseUrl}/job/${jobId}`, {
    method: "GET",
  });

  if (!response.ok) throw new Error(`Haku epäonnistui: ${response.status}`);

  return response.json();
};

// Service funktio, joka poistaa yhden Ai analyysin ID:n perusteella.
export const deleteAiAnalysisById = async (analysisId: string) => {
  const response = await authFetch(`${baseUrl}/${analysisId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error(`Poisto epäonnistui: ${response.status}`);

  return response.json();
};

// Service funktio, joka poistaa kaikki AI analyysit tietylle jobPostingille.
export const deleteAllAiAnalysisByJobPostingId = async (
  jobPostingId: string,
) => {
  const response = await authFetch(`${baseUrl}/job/${jobPostingId}/all`, {
    method: "DELETE",
  });

  if (!response.ok)
    throw new Error(`Kaikkien poisto epäonnistui: ${response.status}`);

  return response.json();
};

// Service funktio, joka käynnistää AI analyysin kaikille tietyn jobPostingin ehdokkaille.
export const runAiAnalysis = async (jobId: string) => {
  const response = await authFetch(`${baseUrl}/${jobId}`, {
    method: "POST",
  });

  if (!response.ok)
    throw new Error(`Analyysin käynnistys epäonnistui: ${response.status}`);

  return response.json();
};
