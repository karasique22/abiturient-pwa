-- CreateTable
CREATE TABLE "ProgramImage" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProgramImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProgramImage_programId_idx" ON "ProgramImage"("programId");

-- AddForeignKey
ALTER TABLE "ProgramImage" ADD CONSTRAINT "ProgramImage_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
