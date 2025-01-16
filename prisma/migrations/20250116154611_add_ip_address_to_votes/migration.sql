/*
  Warnings:

  - A unique constraint covering the columns `[operatorId,ipAddress,createdAt]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "ipAddress" TEXT NOT NULL DEFAULT 'unknown';

-- CreateIndex
CREATE UNIQUE INDEX "Vote_operatorId_ipAddress_createdAt_key" ON "Vote"("operatorId", "ipAddress", "createdAt");
