/*
  Warnings:

  - Added the required column `closingDate` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryRange` to the `JobPosting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniority` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "closingDate" TEXT NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "salaryRange" TEXT NOT NULL,
ADD COLUMN     "seniority" TEXT NOT NULL;
