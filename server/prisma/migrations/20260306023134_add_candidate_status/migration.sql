-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('NEW', 'SCREENING', 'INTERVIEW', 'OFFER', 'ACCEPTED', 'REJECTED');

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "status" "CandidateStatus" NOT NULL DEFAULT 'NEW';
