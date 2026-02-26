import axios from "axios";

const baseUrl = "http://localhost:5001/aiAnalysis";

// Service funktio, joka hakee yhden kandidaatin ja sen analyysin ID:n perusteella.
export const getAiAnalysisById = async(analysisId: any) => {
    const response = await axios.get(`${baseUrl}/candidate/${analysisId}`, {
        withCredentials: true
    });
    return response;
};

// Service funktio, joka lähettää pyynnön palvelimelle hakeakseen kaikki analyysit yhdestä jobPostingista.
export const getAiAnalysisByJobPostingId = async (jobId: any) => {
    const response = await axios.get(`${baseUrl}/job/${jobId}`, {
        withCredentials: true
    });
    return response;
};

// Service funktio, joka lähettää pyynnön yhden Ai analyysin poistamista varten palvelimelle ID:n perusteella.
export const deleteAiAnalysisById = async (analysisId: any) => {
    const response = await axios.delete(`${baseUrl}/${analysisId}`, {
        withCredentials: true
    });
    return response
};

// Service funktio, joka poistaa kaikki AI analyysit tietylle jobPostingille
export const deleteAllAiAnalysisByJobPostingId = async (jobPostingId: any) => {
    const response = await axios.delete(`${baseUrl}/job/${jobPostingId}/all`, {
        withCredentials: true
    });
    return response;
};
// Service funktio, joka lähettää pyynnön palvelimelle käynnistääkseen AI analyysin kaikille tietyn jobPostingin ehdokkaille.
export const runAiAnalysis = async (jobId: string) => {
    const response = await axios.post(`${baseUrl}/${jobId}`);
    return response; 
};