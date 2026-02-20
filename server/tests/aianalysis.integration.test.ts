import request from "supertest";
import app from "../src/app";

import * as aiService from "../src/services/ai.service";
import prisma from "../src/prisma";

jest.mock("../src/services/ai.service");

describe("AI Analysis Controller - Integration Tests", () => {
  const BASE_URL = "/aiAnalysis";

  let globalJobPostingId: string;

  beforeAll(async () => {
    // 1. Luodaan testi-käyttäjä
    const user = await prisma.user.create({
      data: {
        email: `test_${Date.now()}@test.com`,
        password: "password123",
      },
    });

    // 2. Luodaan työpaikkailmoitus 
    const job = await prisma.jobPosting.create({
      data: {
        title: "Node.js Developer",
        description: "Etsimme osaajaa",
        location: "Helsinki",
        employmentType: "Full-time",
        seniority: "Senior",
        department: "Engineering",
        requirements: "Node.js, TypeScript, PostgreSQL",
        salaryRange: "5000-6000",
        closingDate: "2026-12-31",
        user_id: user.id,
      },
    });
    globalJobPostingId = job.id;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await prisma.aIAnalysis.deleteMany();
  });

  afterAll(async () => {
    // Siivous käänteisessä järjestyksessä riippuvuuksien vuoksi
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

  test("IT-02: Should return message if no candidates exist for job", async () => {
    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ei uusia analysoitavia ehdokkaita.");
  });

  test("IT-03: Should successfully analyze real candidate from DB", async () => {
    // 1. Luodaan ehdokas ja liitetään siihen dokumentti (CV)
    const candidate = await prisma.candidate.create({
      data: {
        job_posting_id: globalJobPostingId,
        name: "Matti Meikäläinen",
        email: "matti@test.com",
        documents: {
          create: {
            document_type: "CV", 
            original_filename: "cv.pdf",
            file_type: "pdf",
            file_size: 1024,
            extracted_text: "Osaan Node.js ja TypeScriptiä hyvin.",
          },
        },
      },
    });

    const mockAiResult = {
      score: 90,
      summary: "Erinomainen ehdokas",
      skills: ["Node.js", "TypeScript"],
      years_experience: 5,
      education_level: "master",
      keyword_matches: { "Node.js": true, TypeScript: true },
      strengths: ["Vahva kokemus"],
      weaknesses: ["Ei mainittavaa"],
      raw_ai_response: { original: "Full response" },
    };

    (aiService.analyzeTextWithAI as jest.Mock).mockResolvedValueOnce(
      mockAiResult,
    );

    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.processed_count).toBe(1);

    const analysisInDb = await prisma.aIAnalysis.findFirst({
      where: { candidate_id: candidate.id },
    });

    expect(analysisInDb).toBeDefined();
    expect(analysisInDb?.score).toBe(90);
    expect(analysisInDb?.education_level).toBe("master");
  });
});
