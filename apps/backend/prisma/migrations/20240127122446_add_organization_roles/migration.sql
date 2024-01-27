-- CreateTable
CREATE TABLE "MemberRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationRoleId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OrganizationRole" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MemberRole_id_key" ON "MemberRole"("id");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationRole_id_key" ON "OrganizationRole"("id");

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_organizationRoleId_fkey" FOREIGN KEY ("organizationRoleId") REFERENCES "OrganizationRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberRole" ADD CONSTRAINT "MemberRole_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizationRole" ADD CONSTRAINT "OrganizationRole_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
