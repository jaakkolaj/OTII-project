import "dotenv/config";
import prisma from "../../src/prisma";

export async function createCandidate(job_posting_id: any) {
  return prisma.candidate.create({
    data: {
      job_posting_id: job_posting_id,
      name: "Test Candidate",
      email: "anotherTest1@example.com",
    },
  });
}
