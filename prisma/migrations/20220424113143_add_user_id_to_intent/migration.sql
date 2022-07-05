/*
  Warnings:

  - Added the required column `userId` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentIntent" ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "webhook_urls" TEXT[];

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
