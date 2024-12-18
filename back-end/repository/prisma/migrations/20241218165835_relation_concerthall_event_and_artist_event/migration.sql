/*
  Warnings:

  - Added the required column `artistId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concertHallId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "artistId" INTEGER NOT NULL,
ADD COLUMN     "concertHallId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_concertHallId_fkey" FOREIGN KEY ("concertHallId") REFERENCES "ConcertHall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
