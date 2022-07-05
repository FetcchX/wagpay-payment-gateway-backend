/*
  Warnings:

  - The `accepted_currencies` column on the `Pages` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `currency` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CURRENCY" AS ENUM ('solana', 'ethereum', 'usdcsol', 'usdceth');

-- DropForeignKey
ALTER TABLE "Pages" DROP CONSTRAINT "Pages_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Submission" DROP CONSTRAINT "Submission_productId_fkey";

-- AlterTable
ALTER TABLE "Pages" DROP COLUMN "accepted_currencies",
ADD COLUMN     "accepted_currencies" "CURRENCY"[],
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "currency" "CURRENCY" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "PaymentIntent" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "transaction_hash" TEXT NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "pagesId" INTEGER NOT NULL,
    "from_email" TEXT NOT NULL,
    "currency" "CURRENCY"[],

    CONSTRAINT "PaymentIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToSubmission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PagesToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSubmission_AB_unique" ON "_ProductToSubmission"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSubmission_B_index" ON "_ProductToSubmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PagesToProduct_AB_unique" ON "_PagesToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PagesToProduct_B_index" ON "_PagesToProduct"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentIntent" ADD CONSTRAINT "PaymentIntent_pagesId_fkey" FOREIGN KEY ("pagesId") REFERENCES "Pages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubmission" ADD FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSubmission" ADD FOREIGN KEY ("B") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PagesToProduct" ADD FOREIGN KEY ("A") REFERENCES "Pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PagesToProduct" ADD FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
