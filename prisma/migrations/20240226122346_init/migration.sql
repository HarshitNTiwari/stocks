/*
  Warnings:

  - The primary key for the `Holding` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `price` on the `Holding` table. All the data in the column will be lost.
  - You are about to drop the column `tradingsymbol` on the `Holding` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[demat_account]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `average_price` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_name` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `holderId` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isin` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trading_symbol` to the `Holding` table without a default value. This is not possible if the table is not empty.
  - Added the required column `demat_account` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depository` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depository_participant` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Holding" DROP CONSTRAINT "Holding_pkey",
DROP COLUMN "price",
DROP COLUMN "tradingsymbol",
ADD COLUMN     "average_price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "company_name" TEXT NOT NULL,
ADD COLUMN     "holderId" TEXT NOT NULL,
ADD COLUMN     "isin" TEXT NOT NULL,
ADD COLUMN     "trading_symbol" TEXT NOT NULL,
ADD CONSTRAINT "Holding_pkey" PRIMARY KEY ("isin");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "demat_account" INTEGER NOT NULL,
ADD COLUMN     "depository" TEXT NOT NULL,
ADD COLUMN     "depository_participant" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_demat_account_key" ON "User"("demat_account");

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_holderId_fkey" FOREIGN KEY ("holderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
