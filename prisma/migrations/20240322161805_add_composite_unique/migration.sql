/*
  Warnings:

  - A unique constraint covering the columns `[parentId,locationNumber]` on the table `location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "location_parentId_locationNumber_key" ON "location"("parentId", "locationNumber");
