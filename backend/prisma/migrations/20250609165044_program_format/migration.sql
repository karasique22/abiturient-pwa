/*
  Warnings:

  - Added the required column `format` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgramFormat" AS ENUM ('OFFLINE', 'ONLINE');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "format" "ProgramFormat" NOT NULL;
