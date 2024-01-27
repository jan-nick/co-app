/*
  Warnings:

  - A unique constraint covering the columns `[voteIdentifier]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "voteIdentifier" TEXT;

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "VoteBallot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ballotToken" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "voteOptionId" TEXT NOT NULL,

    CONSTRAINT "VoteBallot_pkey" PRIMARY KEY ("ballotToken","voteId")
);

-- CreateTable
CREATE TABLE "VoteOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "voteId" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_id_key" ON "Vote"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoteBallot_id_key" ON "VoteBallot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "VoteBallot_ballotToken_key" ON "VoteBallot"("ballotToken");

-- CreateIndex
CREATE UNIQUE INDEX "VoteOption_id_key" ON "VoteOption"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_voteIdentifier_key" ON "User"("voteIdentifier");

-- AddForeignKey
ALTER TABLE "VoteBallot" ADD CONSTRAINT "VoteBallot_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteBallot" ADD CONSTRAINT "VoteBallot_voteOptionId_fkey" FOREIGN KEY ("voteOptionId") REFERENCES "VoteOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteOption" ADD CONSTRAINT "VoteOption_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
