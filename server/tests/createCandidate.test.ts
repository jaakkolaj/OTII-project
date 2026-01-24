import prisma from "../src/prisma";
import { createCandidate } from "../src/createCandidate";
import 'dotenv/config';

describe("createCandidate", () => {
  beforeAll(async () => {
    await prisma.candidate.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a candidate in the database", async () => {
    const candidate = await createCandidate();

    expect(candidate).toBeDefined();
    expect(candidate.id).toBeDefined();
    expect(candidate.name).toBe("Test Candidate");
    expect(candidate.email).toBe("anotherTest1@example.com");

    const found = await prisma.candidate.findUnique({
      where: { id: candidate.id },
    });

    expect(found).not.toBeNull();
  });
});
