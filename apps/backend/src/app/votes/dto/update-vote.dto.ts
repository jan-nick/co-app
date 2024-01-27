import { Prisma } from '@prisma/client';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateVoteDto {
  @IsOptional()
  @IsDate()
  startsAt: Date;

  @IsOptional()
  @IsDate()
  endsAt: Date;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  voteOptions: Prisma.VoteOptionCreateNestedManyWithoutVoteInput;
}
