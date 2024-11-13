/*
  Warnings:

  - You are about to drop the column `contactInfo` on the `ConcertHall` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contactInfoId]` on the table `ConcertHall` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactInfoId` to the `ConcertHall` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'ARTIST');

-- AlterTable
ALTER TABLE "ConcertHall" DROP COLUMN "contactInfo",
ADD COLUMN     "contactInfoId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConcertHall_contactInfoId_key" ON "ConcertHall"("contactInfoId");

-- AddForeignKey
ALTER TABLE "ConcertHall" ADD CONSTRAINT "ConcertHall_contactInfoId_fkey" FOREIGN KEY ("contactInfoId") REFERENCES "ContactInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
