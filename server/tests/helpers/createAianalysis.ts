import 'dotenv/config'
import prisma from "../../src/prisma";

export const createAiAnalysis = async (candidate_id: string, job_posting_id: string) => {
    return prisma.aIAnalysis.create({
        data: {
        candidate_id: candidate_id,
        job_posting_id: job_posting_id,
        score: 85,
        summary: "Aiemmin tehty analyysi",
        skills: ["React"],
        years_experience: 3,
        education_level: "bachelor",
        keyword_matches: { React: true },
        strengths: ["Koodaus"],
        weaknesses: ["Testaus"],
        raw_ai_response: { original: "Old response" },
      },
    })
}