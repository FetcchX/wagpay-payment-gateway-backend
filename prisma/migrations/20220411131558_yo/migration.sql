/*
  Warnings:

  - A unique constraint covering the columns `[apiKey,username,email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `apiKey` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "apiKey" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_username_email_key" ON "User"("apiKey", "username", "email");
