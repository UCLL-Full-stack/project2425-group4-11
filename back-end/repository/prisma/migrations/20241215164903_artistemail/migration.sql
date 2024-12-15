/*
  Warnings:

  - Added the required column `email` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "email" TEXT NOT NULL;
