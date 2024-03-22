/*
  Warnings:

  - The primary key for the `email-change` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `token` on the `email-change` table. All the data in the column will be lost.
  - Added the required column `token2` to the `email-change` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email-change" DROP CONSTRAINT "email-change_pkey",
DROP COLUMN "token",
ADD COLUMN     "token2" CHAR(21) NOT NULL,
ADD CONSTRAINT "email-change_pkey" PRIMARY KEY ("token2");
