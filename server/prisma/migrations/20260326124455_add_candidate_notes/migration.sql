-- CreateTable
CREATE TABLE "CandidateNote" (
    "id" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CandidateNote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CandidateNote_candidate_id_idx" ON "CandidateNote"("candidate_id");

-- CreateIndex
CREATE INDEX "AIAnalysis_candidate_id_idx" ON "AIAnalysis"("candidate_id");

-- CreateIndex
CREATE INDEX "AIAnalysis_job_posting_id_idx" ON "AIAnalysis"("job_posting_id");

-- CreateIndex
CREATE INDEX "AIAnalysis_score_idx" ON "AIAnalysis"("score");

-- CreateIndex
CREATE INDEX "ApplicationDocument_candidate_id_idx" ON "ApplicationDocument"("candidate_id");

-- CreateIndex
CREATE INDEX "Candidate_job_posting_id_idx" ON "Candidate"("job_posting_id");

-- CreateIndex
CREATE INDEX "Candidate_job_posting_id_status_idx" ON "Candidate"("job_posting_id", "status");

-- CreateIndex
CREATE INDEX "JobPosting_user_id_idx" ON "JobPosting"("user_id");

-- CreateIndex
CREATE INDEX "Task_user_id_idx" ON "Task"("user_id");

-- AddForeignKey
ALTER TABLE "CandidateNote" ADD CONSTRAINT "CandidateNote_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
