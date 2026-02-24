-- DropForeignKey
ALTER TABLE "AIAnalysis" DROP CONSTRAINT "AIAnalysis_candidate_id_fkey";

-- DropForeignKey
ALTER TABLE "AIAnalysis" DROP CONSTRAINT "AIAnalysis_job_posting_id_fkey";

-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_job_posting_id_fkey";

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_job_posting_id_fkey" FOREIGN KEY ("job_posting_id") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_job_posting_id_fkey" FOREIGN KEY ("job_posting_id") REFERENCES "JobPosting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
