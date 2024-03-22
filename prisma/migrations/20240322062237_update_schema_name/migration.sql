/*
  Warnings:

  - You are about to drop the column `location_name` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `location_number` on the `location` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `location` table. All the data in the column will be lost.
  - Added the required column `locationName` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_parent_id_fkey";

-- AlterTable
ALTER TABLE "location" DROP COLUMN "location_name",
DROP COLUMN "location_number",
DROP COLUMN "parent_id",
ADD COLUMN     "locationName" TEXT NOT NULL,
ADD COLUMN     "locationNumber" TEXT,
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
