import { Worker } from "bullmq";
import { analyzeCandidatesForJobPosting } from "../services/aiAnalysis.service";
console.log("AI worker tiedosto ladattu");
const worker = new Worker(
    "ai-analysis",
    async (job) => {
        console.log("Worker sai jobin:", job.id);
        console.log("Data:", job.data);

        const { jobPostingId } = job.data;
        const result = await analyzeCandidatesForJobPosting(jobPostingId);

        console.log("Analyysi valmis:", result);
        return result;
    },
    {
        connection: {
            url: process.env.REDIS_URL,
            maxRetriesPerRequest: null
        },
    }
);

worker.on("ready", () => {
  console.log("AI analysis worker ready");
});

worker.on("completed", (job) => {
  console.log(`Job ${job.id} valmis`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} epäonnistui:`, err.message);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});