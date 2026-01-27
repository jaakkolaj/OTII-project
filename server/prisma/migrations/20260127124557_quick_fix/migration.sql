/*
  Warnings:

  - Added the required column `department` to the `JobPosting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobPosting" ADD COLUMN     "department" TEXT NOT NULL;
