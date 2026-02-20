import { analyzeTextWithAI, AnalysisResult } from "../src/services/ai.service";
import { openai } from "../src/config/openai";
import Test from "supertest/lib/test";

jest.mock("../src/config/openai", () => ({
  openai: {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  },
}));

//yksikkö testit ai.service funktiolle: analyzeTextWithAI
describe("ai.service: analyzeTextWithAI", () => {
  //tyhjennetään mockit jokaisen testin välissä
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockCv = "Kokenut koodari";
  const mockRequirements = "Etsitään React-osaajaa";

  //Onnistunut analyysi
  test("UT-01: successful analyze", async () => {
    const mockResult: AnalysisResult = {
      name: "Matti Meikäläinen",
      email: "matti@testi.fi",
      skills: ["React", "TypeScript"],
      years_experience: 5.5,
      education_level: "master",
      strengths: ["Kovakoodari"],
      weaknesses: ["Kahvin kulutus"],
      keyword_matches: { React: true },
      summary: "Erittäin hyvä",
      score: 95,
    };
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [{ message: { content: JSON.stringify(mockResult) } }],
    });

    const result = await analyzeTextWithAI(mockCv, mockRequirements);

    expect(result).toEqual(mockResult);
    expect(result.score).toBe(95);
    expect(openai.chat.completions.create).toHaveBeenCalledTimes(1);
  });
  
  //Virheellinen JSON
  test("UT-02: malformed JSON from AI throws an error", async () => {
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [{ message: { content: "Tämä ei ole JSONia" } }],
    });

    // Palvelu heittää catch-lohkossa "Analyysi epäonnistui." -virheen
    await expect(analyzeTextWithAI(mockCv, mockRequirements)).rejects.toThrow(
      "Analyysi epäonnistui.",
    );
  });
  //Tyhjä openAI vastaus
  test("UT-03: empty content from OpenAI throws an error", async () => {
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [{ message: { content: null } }],
    });

    await expect(analyzeTextWithAI(mockCv, mockRequirements)).rejects.toThrow(
      "Analyysi epäonnistui.",
    );
  });

  //Score rajat: 0-100
  test("UT-04: handles boundary scores (0 and 100) correctly", async () => {
    const lowScoreResult = { name: "Testi", score: 0 };
    const highScoreResult = { name: "Testi", score: 100 };

    // Testataan nolla
    (openai.chat.completions.create as jest.Mock).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(lowScoreResult) } }]
    });
    const resultLow = await analyzeTextWithAI(mockCv, mockRequirements);
    expect(resultLow.score).toBe(0);

    // Testataan sata
    (openai.chat.completions.create as jest.Mock).mockResolvedValueOnce({
      choices: [{ message: { content: JSON.stringify(highScoreResult) } }]
    });
    const resultHigh = await analyzeTextWithAI(mockCv, mockRequirements);
    expect(resultHigh.score).toBe(100);
  });
});
