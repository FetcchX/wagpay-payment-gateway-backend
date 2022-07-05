/*
  Warnings:

  - You are about to drop the column `from_email` on the `PaymentIntent` table. All the data in the column will be lost.
  - You are about to drop the column `pagesId` on the `PaymentIntent` table. All the data in the column will be lost.
  - Added the required column `description` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `PaymentIntent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaymentIntent" DROP CONSTRAINT "PaymentIntent_pagesId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_pagesId_fkey";

-- AlterTable
ALTER TABLE "PaymentIntent" DROP COLUMN "from_email",
DROP COLUMN "pagesId",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "from_data" JSONB,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "products" JSONB,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "pagesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_pagesId_fkey" FOREIGN KEY ("pagesId") REFERENCES "Pages"("id") ON DELETE SET NULL ON UPDATE CASCADE;
