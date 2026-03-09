import { Queue } from "bullmq";

export const aiAnalysisQueue = new Queue("ai-analysis", {
    connection: {
        url: process.env.REDIS_URL,
    },
});