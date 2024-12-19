-- CreateTable
CREATE TABLE "ConcertHallArtist" (
    "id" SERIAL NOT NULL,
    "concertHallId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ConcertHallArtist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConcertHallArtist_concertHallId_artistId_key" ON "ConcertHallArtist"("concertHallId", "artistId");

-- AddForeignKey
ALTER TABLE "ConcertHallArtist" ADD CONSTRAINT "ConcertHallArtist_concertHallId_fkey" FOREIGN KEY ("concertHallId") REFERENCES "ConcertHall"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConcertHallArtist" ADD CONSTRAINT "ConcertHallArtist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
