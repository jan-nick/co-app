import { IsEmail, IsUUID } from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  email: string;

  @IsUUID()
  organizationId: string;
}
