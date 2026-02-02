import prisma from "../src/prisma";
import { createCandidate } from "./helpers/createCandidate";
import 'dotenv/config';

describe("createCandidate", () => {

  // Poistetaan mahdollinen testikandidaatti ennen testejä
  beforeAll(async () => {
    await prisma.candidate.deleteMany({
      where: { email: "createCandidateTest@example.com" }
    });
  });

  // Suljetaan Prisma-yhteys testien jälkeen
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a candidate in the database", async () => {
    const candidate = await createCandidate("createCandidateTest@example.com");

    // Tarkistetaan että kandidaatti luotiin oikein
    expect(candidate).toBeDefined();
    expect(candidate.id).toBeDefined();
    expect(candidate.name).toBe("Test Candidate");
    expect(candidate.email).toBe("createCandidateTest@example.com");

    // Haetaan suoraan tietokannasta varmistaen persistoituminen
    const found = await prisma.candidate.findUnique({
      where: { id: candidate.id },
    });
    expect(found).not.toBeNull();
  });
});
