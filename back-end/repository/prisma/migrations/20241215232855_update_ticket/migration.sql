/*
  Warnings:

  - You are about to drop the column `generalAdmission` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `seat` on the `Ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "generalAdmission",
DROP COLUMN "seat";
