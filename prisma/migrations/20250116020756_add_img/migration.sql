/*
  Warnings:

  - Added the required column `img` to the `Operator` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Operator" ADD COLUMN     "img" TEXT NOT NULL;
