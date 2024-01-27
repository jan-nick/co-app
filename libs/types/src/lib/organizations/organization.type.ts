import { Organization, OrganizationRole } from '@prisma/client';

export type OrganizationWithRoles = Organization & {
  organizationRoles: OrganizationRole[];
};
