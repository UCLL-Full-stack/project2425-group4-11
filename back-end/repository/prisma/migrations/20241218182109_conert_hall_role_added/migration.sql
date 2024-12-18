/*
  Warnings:

  - Added the required column `role` to the `ConcertHall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConcertHall" ADD COLUMN     "role" TEXT NOT NULL;
