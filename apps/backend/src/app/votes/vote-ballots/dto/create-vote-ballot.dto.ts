import { IsUUID } from 'class-validator';

export class CreateVoteBallotDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  voteId: string;

  @IsUUID()
  voteOptionId: string;
}
