import "dotenv/config";
import prisma from "../../src/prisma";

export async function createCandidate() {
  return prisma.candidate.create({
    data: {
      name: "Test Candidate",
      email: "anotherTest1@example.com",
    },
  });
}
