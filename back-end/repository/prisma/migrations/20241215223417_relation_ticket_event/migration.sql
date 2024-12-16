/*
  Warnings:

  - A unique constraint covering the columns `[eventId]` on the table `Ticket` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `eventId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_eventId_key" ON "Ticket"("eventId");

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
