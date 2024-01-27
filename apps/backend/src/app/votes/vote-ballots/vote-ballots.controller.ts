import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VoteBallotsService } from './vote-ballots.service';
import { CreateVoteBallotDto } from './dto/create-vote-ballot.dto';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';

@Controller('vote-ballots')
export class VoteBallotsController {
  constructor(private readonly voteBallotsService: VoteBallotsService) {}

  @Post()
  create(@Body() createVoteBallotDto: CreateVoteBallotDto) {
    return this.voteBallotsService.create(createVoteBallotDto);
  }

  @Get()
  async findAll(@ParseArgs() args: Prisma.VoteBallotFindManyArgs) {
    const voteBallots = await this.voteBallotsService.findAll(args);
    return voteBallots;
  }

  @Get(':userId/:voteId')
  async findByUserIdAndVoteId(
    @Param('userId') userId: string,
    @Param('voteId') voteId: string
  ) {
    const vote = await this.voteBallotsService.findByUserIdAndVoteId(
      userId,
      voteId
    );
    return vote;
  }
}
