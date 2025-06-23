/*
  Warnings:

  - Added the required column `curatorName` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgramLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "ProgramDocument" AS ENUM ('DIPLOMA_PROFESSIONAL_RETRAINING', 'DIPLOMA_PROFESSIONAL_DEVELOPMENT', 'CERTIFICATE_OF_COMPLETION');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "content" JSONB,
ADD COLUMN     "curatorInfo" TEXT,
ADD COLUMN     "curatorName" TEXT NOT NULL,
ADD COLUMN     "document" "ProgramDocument",
ADD COLUMN     "durationYears" INTEGER,
ADD COLUMN     "level" "ProgramLevel";
