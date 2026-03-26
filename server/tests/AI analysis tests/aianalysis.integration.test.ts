import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/prisma";
import { createCandidate } from "../helpers/createCandidate";
import { createJobPosting } from "../helpers/createJobPosting";
import { createUser } from "../helpers/createUser";
import { createAiAnalysis } from "../helpers/createAianalysis";
import { aiAnalysisQueue } from "../../src/queues/aiAnalysis.queue";

jest.mock("../../src/queues/aiAnalysis.queue", () => ({
  aiAnalysisQueue: {
    add: jest.fn(),
  },
}));

jest.mock("../../src/middleware/authentication", () => ({
  authentication: (req: any, res: any, next: any) => {
    req.user = { id: "test-user-id", email: "test@example.com" };
    next();
  },
}));

jest.mock("../../src/middleware/rateLimiter", () => ({
  standardRateLimiter: () => (req: any, res: any, next: any) => next(),
  AiAnalysisRateLimitMiddleware: (req: any, res: any, next: any) => next(),
  aiConcurrencyMiddleware: (req: any, res: any, next: any) => next(),
  uploadRateLimitMiddleware: (req: any, res: any, next: any) => next(),
}));

describe("AI Analysis Controller - Integration Tests", () => {
  const BASE_URL = "/aiAnalysis";

  let globalJobPostingId: string;

  beforeAll(async () => {
    const user = await createUser("testikayttaja@gmail.com");
    const jobPosting = await createJobPosting(user.id);
    globalJobPostingId = jobPosting.id;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await prisma.aIAnalysis.deleteMany();
    await prisma.applicationDocument.deleteMany();
    await prisma.candidate.deleteMany();
  });

  afterAll(async () => {
    await prisma.aIAnalysis.deleteMany();
    await prisma.applicationDocument.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.jobPosting.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();
  });

  test("IT-01: Should return 400 if jobPostingId is invalid UUID", async () => {
    const response = await request(app).post(`${BASE_URL}/not-a-uuid`).send();

    expect(response.status).toBe(400);
  });

  test("IT-02: Should enqueue AI analysis job", async () => {
    (aiAnalysisQueue.add as jest.Mock).mockResolvedValueOnce({ id: "job-123" });

    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Analyysi käynnistetty");
    expect(response.body.jobId).toBe("job-123");
    expect(aiAnalysisQueue.add).toHaveBeenCalledTimes(1);
  });

  test("IT-03: Should return 500 if queue enqueue fails", async () => {
    (aiAnalysisQueue.add as jest.Mock).mockRejectedValueOnce(
      new Error("Redis unavailable"),
    );

    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    expect(response.status).toBe(500);
  });

  test("IT-04: Status should be completed when all candidates are analyzed", async () => {
    const candidate = await createCandidate(globalJobPostingId);
    await createAiAnalysis(candidate.id, globalJobPostingId);

    const response = await request(app)
      .post(`${BASE_URL}/jobPostings/${globalJobPostingId}/ai-analysis`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("completed");
    expect(response.body.totalCandidates).toBe(1);
    expect(response.body.analyzedCandidates).toBe(1);
  });

  test("IT-05: Status should be processing when analyses are missing", async () => {
    await createCandidate(globalJobPostingId);

    const response = await request(app)
      .post(`${BASE_URL}/jobPostings/${globalJobPostingId}/ai-analysis`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("processing");
    expect(response.body.totalCandidates).toBe(1);
    expect(response.body.analyzedCandidates).toBe(0);
  });
});
