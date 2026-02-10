import axios from "axios";

const baseUrl = "http://localhost:5001/aiAnalysis";

export const getAiAnalyses = async() => {
    const response = await axios.get(baseUrl, {
        withCredentials: true
    });
    return response;
};

export const getAiAnalysisById = async(analysisId: any) => {
    const response = await axios.get(`${baseUrl}/${analysisId}`, {
        withCredentials: true
    });
    return response;
};

export const getAiAnalysisByJobPostingId = async (jobId: any) => {
    const response = await axios.get(`${baseUrl}/${jobId}`, {
        withCredentials: true
    });
    return response;
};