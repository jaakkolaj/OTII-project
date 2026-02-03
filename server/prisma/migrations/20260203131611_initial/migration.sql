/*
  Warnings:

  - Added the required column `extracted_text` to the `ApplicationDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_type` to the `ApplicationDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_filename` to the `ApplicationDocument` table without a default value. This is not possible if the table is not empty.
  - Added the required column `job_posting_id` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIAnalysis" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ApplicationDocument" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "extracted_text" TEXT NOT NULL,
ADD COLUMN     "file_size" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "file_type" TEXT NOT NULL,
ADD COLUMN     "original_filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "job_posting_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_job_posting_id_fkey" FOREIGN KEY ("job_posting_id") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_job_posting_id_fkey" FOREIGN KEY ("job_posting_id") REFERENCES "JobPosting"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDocument" ADD CONSTRAINT "ApplicationDocument_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
