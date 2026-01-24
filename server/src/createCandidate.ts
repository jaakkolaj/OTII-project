import "dotenv/config";
import prisma from "./prisma";

export async function createCandidate() {
  return prisma.candidate.create({
    data: {
      name: "Test Candidate",
      email: "anotherTest1@example.com",
    },
  });
}
