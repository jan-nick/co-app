import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberRolesDto } from './dto/update-member-roles.dto';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  async findAll(@ParseArgs() args: Prisma.MemberFindManyArgs) {
    const members = await this.membersService.findAll(args);
    return members;
  }

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    const member = await this.membersService.create(createMemberDto);
    return member;
  }

  @Patch('set-roles')
  setRoles(@Body() updateMemberRolesDto: UpdateMemberRolesDto) {
    return this.membersService.setRoles(updateMemberRolesDto);
  }
}
