/*
  Warnings:

  - You are about to drop the column `durationWeeks` on the `Program` table. All the data in the column will be lost.
  - Made the column `slug` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `category` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProgramCategory" AS ENUM ('PROFESSIONAL_RETRAINING', 'PROFESSIONAL_DEVELOPMENT');

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "durationWeeks",
ADD COLUMN     "category" "ProgramCategory" NOT NULL,
ADD COLUMN     "durationHours" INTEGER;
