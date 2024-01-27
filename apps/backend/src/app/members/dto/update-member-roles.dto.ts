import { MemberRole } from '@prisma/client';
import { IsArray, IsUUID } from 'class-validator';

export class UpdateMemberRolesDto {
  @IsUUID()
  memberId: string;

  @IsArray()
  memberRoles: MemberRole[];
}
