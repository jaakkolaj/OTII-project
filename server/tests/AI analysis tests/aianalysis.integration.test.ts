import request from "supertest";
import app from "../../src/app";

import * as aiService from "../../src/services/ai.service";
import prisma from "../../src/prisma";
import { createCandidate } from "../helpers/createCandidate";
import { createJobPosting } from "../helpers/createJobPosting";
import { createUser } from "../helpers/createUser";
import { createApplicationDocument } from "../helpers/createApplicationDocument";
import { createAiAnalysis } from "../helpers/createAianalysis";

jest.mock("../../src/services/ai.service");

describe("AI Analysis Controller - Integration Tests", () => {
  const BASE_URL = "/aiAnalysis";

  let globalJobPostingId: string;

  beforeAll(async () => {
    // 1. Luodaan testi-käyttäjä
    const user = await createUser("Testikäyttäjä@gmail.com");

    // 2. Luodaan työpaikkailmoitus 
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
    // Siivous käänteisessä järjestyksessä riippuvuuksien vuoksi
    await prisma.aIAnalysis.deleteMany();
    await prisma.applicationDocument.deleteMany();
    await prisma.candidate.deleteMany();
    await prisma.jobPosting.deleteMany();
    await prisma.user.deleteMany();

    await prisma.$disconnect();
  });

  // 1. Väärän tyyppinen jobPostingId (ei UUID)
  test("IT-01: Should return 400 if jobPostingId is invalid UUID", async () => {
    const response = await request(app).post(`${BASE_URL}/not-a-uuid`).send();

    expect(response.status).toBe(400);
  });
  // 2. Ei ehdokkaita analysoitavaksi
  test("IT-02: Should return message if no candidates exist for job", async () => {
    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Ei uusia analysoitavia ehdokkaita.");
  });

  // 3. Onnistuu analysoimaan ehdokas ja tallentamaan tulokset tietokantaan 
  test("IT-03: Should successfully analyze real candidate from DB", async () => {

    // 1. Luodaan ehdokas ja liitetään siihen dokumentti (CV)
    const candidate = await createCandidate(globalJobPostingId);
    await createApplicationDocument(candidate.id);
    
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

  // 4. Ehdokas on jo analysoitu (Skip-logiikka)
  test("IT-04: Should skip candidate if AI analysis already exists", async () => {
    // 1. Luodaan ehdokas ja dokumentti
    const candidate = await createCandidate(globalJobPostingId);
    await createApplicationDocument(candidate.id);

    // 2. Luodaan valmis analyysi kantaan tälle ehdokkaalle
    await createAiAnalysis(candidate.id, globalJobPostingId);

    // Puhdistetaan mockien laskurit (jotta aiemmat testit eivät vaikuta tähän)
    jest.clearAllMocks();

    // 3. Kutsutaan reittiä
    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    // 4. Varmistetaan tulokset
    expect(response.status).toBe(200);
    expect(aiService.analyzeTextWithAI).not.toHaveBeenCalled(); 
    
    expect(response.body.message).toBe("Ei uusia analysoitavia ehdokkaita.");
  });

  // 5. AI-palvelu kaatuu tai palauttaa virheen (Error handling)
  test("IT-05: Should handle AI service error gracefully", async () => {
    // 1. Luodaan uusi ehdokas ja dokumentti
    const candidate = await createCandidate(globalJobPostingId);
    await createApplicationDocument(candidate.id);

    // 2. Pakotetaan AI-palvelu (mock) heittämään virhe (esim. API alhaalla tai rate limit)
    (aiService.analyzeTextWithAI as jest.Mock).mockRejectedValueOnce(
      new Error("OpenAI API is down or rate limited")
    );
    // 3. Kutsutaan reittiä
    const response = await request(app)
      .post(`${BASE_URL}/${globalJobPostingId}`)
      .send();

    // 4. Varmistetaan, että API käsittelee virheen (eikä sovellus kaadu)
    expect(response.status).toBe(200); 

    // 5. Varmistetaan, ettei tietokantaan vahingossa tallennettu tyhjää/viallista analyysia
    const analysisInDb = await prisma.aIAnalysis.findFirst({
      where: { candidate_id: candidate.id },
    });
    expect(analysisInDb).toBeNull();
  });
});
