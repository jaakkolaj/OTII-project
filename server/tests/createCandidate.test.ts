import prisma from "../src/prisma";
import { createCandidate } from "./helpers/createCandidate";
import { createUser } from "./helpers/createUser";
import { createJobPosting } from "./helpers/createJobPosting";
import 'dotenv/config';

describe("createCandidate", () => {
  let candidate_id: string;
  let user_id: string;
  let jobPosting_id: string;

  beforeAll(async () => {
    // Luodaan käyttäjä, jobPosting ja kandidaatti testiä varten.
    const userEmail = "createCandidate@gmail.com";
    const user = await createUser(userEmail);
    const jobPosting = await createJobPosting(user.id);

    // Asetetaan ID:t muuttujiin.
    user_id = user.id;
    jobPosting_id = jobPosting.id;
  });

  afterAll(async () => {
    // Siivotaan testien jälkeen ja poistetaan applicationDocument, candidaatti, jobPosting ja user.
    await prisma.candidate.delete({ where: { id: candidate_id } });
    await prisma.jobPosting.delete({ where: { id: jobPosting_id } });
    await prisma.user.delete({ where: { id: user_id } });
    await prisma.$disconnect();
  });

  it("creates a candidate in the database", async () => {
    const candidate = await createCandidate(jobPosting_id);

    expect(candidate).toBeDefined();
    expect(candidate.id).toBeDefined();
    expect(candidate.name).toBe("Test Candidate");
    expect(candidate.email).toBe("anotherTest1@example.com");

    const found = await prisma.candidate.findUnique({
      where: { id: candidate.id },
    });

    candidate_id = candidate.id;
    expect(found).not.toBeNull();
  });
});
