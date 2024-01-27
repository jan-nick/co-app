import { Prisma, VoteOption } from '@prisma/client';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateVoteDto {
  @IsUUID()
  organizationId: string;

  @IsDate()
  startsAt: Date;

  @IsDate()
  endsAt: Date;

  @IsString()
  name: string;

  @IsString()
  description: string;

  voteOptions: VoteOption[];
}
