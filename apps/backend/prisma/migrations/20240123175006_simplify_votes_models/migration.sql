/*
  Warnings:

  - You are about to drop the column `voteIdentifier` on the `User` table. All the data in the column will be lost.
  - The primary key for the `VoteBallot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ballotToken` on the `VoteBallot` table. All the data in the column will be lost.
  - Added the required column `userId` to the `VoteBallot` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_voteIdentifier_key";

-- DropIndex
DROP INDEX "VoteBallot_ballotToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "voteIdentifier";

-- AlterTable
ALTER TABLE "VoteBallot" DROP CONSTRAINT "VoteBallot_pkey",
DROP COLUMN "ballotToken",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "VoteBallot_pkey" PRIMARY KEY ("userId", "voteId");

-- AddForeignKey
ALTER TABLE "VoteBallot" ADD CONSTRAINT "VoteBallot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
