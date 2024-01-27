import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../core/prisma/prisma.service';

@Injectable()
export class VoteOptionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: Prisma.VoteOptionFindManyArgs) {
    return this.prisma.voteOption.findMany(args);
  }
}
