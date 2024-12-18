/*
  Warnings:

  - You are about to drop the column `contactInfoId` on the `ConcertHall` table. All the data in the column will be lost.
  - You are about to drop the `ContactInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConcertHall" DROP CONSTRAINT "ConcertHall_contactInfoId_fkey";

-- DropIndex
DROP INDEX "ConcertHall_contactInfoId_key";

-- AlterTable
ALTER TABLE "ConcertHall" DROP COLUMN "contactInfoId",
ADD COLUMN     "contactInfo" TEXT[];

-- DropTable
DROP TABLE "ContactInfo";
