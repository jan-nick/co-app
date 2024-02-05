import { OrganizationRole } from '@prisma/client';
import { IsArray, IsEmail, IsOptional, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  email: string;

  @IsUUID()
  organizationId: string;

  @IsOptional()
  @IsArray()
  organizationRoles: OrganizationRole[];
}
