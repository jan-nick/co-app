import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post()
  create(@Body() createVoteDto: CreateVoteDto) {
    return this.votesService.create(createVoteDto);
  }

  @Get()
  async findAll(@ParseArgs() args: Prisma.VoteFindManyArgs) {
    const votes = await this.votesService.findAll(args);
    return votes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const vote = await this.votesService.findOne(id);
    return vote;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVoteDto: UpdateVoteDto) {
    return this.votesService.update(id, updateVoteDto);
  }
}
