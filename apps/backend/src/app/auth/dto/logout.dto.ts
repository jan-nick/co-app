import { IsString, IsUUID } from 'class-validator';

export class LogoutDto {
  @IsUUID()
  userId: string;

  @IsString()
  accessToken: string;
}
