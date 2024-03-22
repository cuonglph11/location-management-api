/*
  Warnings:

  - You are about to drop the `email-change` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `email-verification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password-reset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "email-change" DROP CONSTRAINT "email-change_userId_fkey";

-- DropForeignKey
ALTER TABLE "email-verification" DROP CONSTRAINT "email-verification_userId_fkey";

-- DropForeignKey
ALTER TABLE "password-reset" DROP CONSTRAINT "password-reset_userId_fkey";

-- DropTable
DROP TABLE "email-change";

-- DropTable
DROP TABLE "email-verification";

-- DropTable
DROP TABLE "password-reset";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "location_name" TEXT NOT NULL,
    "location_number" TEXT,
    "area" DOUBLE PRECISION,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
