/*
  Warnings:

  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `VoteBallot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `MemberRole` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[organizationId,userId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,voteId]` on the table `VoteBallot` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "MemberRole" DROP CONSTRAINT "MemberRole_memberId_fkey";

-- DropForeignKey
ALTER TABLE "MemberRole" DROP CONSTRAINT "MemberRole_organizationRoleId_fkey";

-- DropIndex
DROP INDEX "Member_id_key";

-- DropIndex
DROP INDEX "OrganizationRole_id_key";

-- DropIndex
DROP INDEX "VoteBallot_id_key";

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VoteBallot" DROP CONSTRAINT "VoteBallot_pkey",
ADD CONSTRAINT "VoteBallot_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "MemberRole";

-- CreateTable
CREATE TABLE "_MemberToOrganizationRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberToOrganizationRole_AB_unique" ON "_MemberToOrganizationRole"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberToOrganizationRole_B_index" ON "_MemberToOrganizationRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Member_organizationId_userId_key" ON "Member"("organizationId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteBallot_userId_voteId_key" ON "VoteBallot"("userId", "voteId");

-- AddForeignKey
ALTER TABLE "_MemberToOrganizationRole" ADD CONSTRAINT "_MemberToOrganizationRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberToOrganizationRole" ADD CONSTRAINT "_MemberToOrganizationRole_B_fkey" FOREIGN KEY ("B") REFERENCES "OrganizationRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;
