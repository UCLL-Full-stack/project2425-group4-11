/*
  Warnings:

  - Added the required column `password` to the `Artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL;