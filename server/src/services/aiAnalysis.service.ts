import prisma from "../prisma";
import { analyzeTextWithAI } from "./ai.service";

export const analyzeCandidatesForJobPosting = async(jobPostingId: string) => {

    //Haetaan kaikki ehdokkaat, joilla ei ole vielä analyysia tässä työpaikassa
    const candidates = await prisma.candidate.findMany({
      where: {
        job_posting_id: jobPostingId,
        ai_analyses: { none: {} },
      },
      include: {
        documents: true,
        job_posting: true,
      },
    });

    // if (candidates.length === 0) {
    //   return res
    //     .status(200)
    //     .json({ message: "Ei uusia analysoitavia ehdokkaita." });
    // }

    const results: {
        id: string;
        status: "success" | "error" | "skipped";
        error?: string;
    }[] = [];

    //Käydään läpi jokainen kandidaatti sen cv ja kutsutaan AI service
    for (const candidate of candidates) {
        const cvText = candidate.documents[0]?.extracted_text;
        const jobRequirements = candidate.job_posting.requirements;

        if (!cvText) {
            results.push({
                id: candidate.id,
                status: "skipped",
            });
            continue;
        }

        try {
            const aiResult = await analyzeTextWithAI(cvText, jobRequirements);
            // Varmistetaan, että score on aina välillä 0 - 100
            const safeScore = Math.min(Math.max(aiResult.score, 0), 100);
            //päivitetään tietokantaan kandidaatin tiedot ja luodaan aiAnalyysi
            //päivitetään tietokantaan kandidaatin tiedot ja luodaan aiAnalyysi
            await prisma.$transaction([
                prisma.candidate.update({
                    where: { id: candidate.id },
                    data: { name: aiResult.name, email: aiResult.email },
                }),
                prisma.aIAnalysis.create({
                    data: {
                        candidate_id: candidate.id,
                        job_posting_id: candidate.job_posting_id,
                        skills: aiResult.skills,
                        years_experience: aiResult.years_experience,
                        education_level: aiResult.education_level,
                        keyword_matches: aiResult.keyword_matches,
                        strengths: aiResult.strengths,
                        weaknesses: aiResult.weaknesses,
                        summary: aiResult.summary,
                        score: safeScore,
                        raw_ai_response: aiResult as any,
                    },
                }),
            ]);
            results.push({ id: candidate.id, status: "success" });
        } catch (error: any) {
            console.error(
                `Analyysi epäonnistui ehdokkaalle ${candidate.id}:`,
                error.message,
            );
            results.push({
                id: candidate.id,
                status: "error",
                error: error.message,
            });
        }
    }

    return results;
};