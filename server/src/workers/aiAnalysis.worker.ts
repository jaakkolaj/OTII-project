import { Worker } from "bullmq";
import { analyzeCandidatesForJobPosting } from "../services/aiAnalysis.service";

const worker = new Worker(
    "ai-analysis",
    async (job) => {
        const { jobPostingId } = job.data;
        const result = await analyzeCandidatesForJobPosting(jobPostingId);
        return result;
    },
    {
        connection: {
            url: process.env.REDIS_URL,
            maxRetriesPerRequest: null
        },
    }
);
worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} epäonnistui:`, err.message);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});