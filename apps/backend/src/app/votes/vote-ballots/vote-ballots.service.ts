import { Injectable } from '@nestjs/common';
import { CreateVoteBallotDto } from './dto/create-vote-ballot.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class VoteBallotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVoteBallotDto: CreateVoteBallotDto) {
    return this.prisma.voteBallot.create({
      data: createVoteBallotDto,
    });
  }

  findAll(args: Prisma.VoteBallotFindManyArgs) {
    return this.prisma.voteBallot.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.voteBallot.findUnique({
      where: { id },
    });
  }

  findByUserIdAndVoteId(userId: string, voteId: string) {
    return this.prisma.voteBallot.findFirst({
      where: { userId, voteId },
    });
  }
}
