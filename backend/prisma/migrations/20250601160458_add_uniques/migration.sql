/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ProgramCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Program_title_key" ON "Program"("title");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramCategory_name_key" ON "ProgramCategory"("name");
