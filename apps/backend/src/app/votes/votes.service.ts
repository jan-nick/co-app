import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class VotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVoteDto: CreateVoteDto) {
    const { voteOptions, ...voteFields } = createVoteDto;
    return this.prisma.vote.create({
      data: {
        ...voteFields,
        voteOptions: { createMany: { data: voteOptions } },
      },
    });
  }

  findAll(args: Prisma.VoteFindManyArgs) {
    return this.prisma.vote.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.vote.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateVoteDto: UpdateVoteDto) {
    const vote = await this.findOne(id);

    if (vote.startsAt < new Date()) {
      throw new ForbiddenException('Vote can not be changed after it started');
    }

    return this.prisma.vote.update({
      where: { id },
      data: updateVoteDto,
    });
  }
}
