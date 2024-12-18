/*
  Warnings:

  - Added the required column `isVerified` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `ConcertHall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "isVerified" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ConcertHall" ADD COLUMN     "isVerified" TEXT NOT NULL;
