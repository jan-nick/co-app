import { Member, OrganizationRole, User } from '@prisma/client';

export type MemberWithOrganizationRoles = Member & {
  organizationRoles: OrganizationRole[];
};

export type MemberWithUser = Member & {
  user: User;
};

export type MemberWithOrganizationRolesAndUser = MemberWithUser &
  MemberWithOrganizationRoles;
