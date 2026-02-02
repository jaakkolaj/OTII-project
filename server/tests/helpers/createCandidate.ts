import "dotenv/config";
import prisma from "../../src/prisma";

export async function createCandidate(email: string) {
  return prisma.candidate.create({
    data: {
      name: "Test Candidate",
      email: email,
    },
  });
}
