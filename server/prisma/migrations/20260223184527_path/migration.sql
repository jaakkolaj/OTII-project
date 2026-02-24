/*
  Warnings:

  - Added the required column `path` to the `ApplicationDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationDocument" ADD COLUMN     "path" TEXT NOT NULL;
