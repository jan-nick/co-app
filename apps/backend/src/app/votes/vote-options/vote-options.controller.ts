import { Controller, Get } from '@nestjs/common';
import { VoteOptionsService } from './vote-options.service';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';

@Controller('vote-options')
export class VoteOptionsController {
  constructor(private readonly voteOptionsService: VoteOptionsService) {}

  @Get()
  async findAll(@ParseArgs() args: Prisma.VoteOptionFindManyArgs) {
    const voteOptions = await this.voteOptionsService.findAll(args);
    return voteOptions;
  }
}
