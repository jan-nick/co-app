/*
  Warnings:

  - Made the column `voteId` on table `VoteOption` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "VoteOption" DROP CONSTRAINT "VoteOption_voteId_fkey";

-- AlterTable
ALTER TABLE "VoteOption" ALTER COLUMN "voteId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "VoteOption" ADD CONSTRAINT "VoteOption_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
