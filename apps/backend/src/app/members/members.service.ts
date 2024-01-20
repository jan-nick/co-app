import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class MembersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService
  ) {}

  findAll(args: Prisma.MemberFindManyArgs) {
    return this.prisma.member.findMany(args);
  }

  async create({ email, organizationId }: CreateMemberDto) {
    const user = await this.usersService.findOneByEmail(email);
    return this.prisma.member.create({
      data: { userId: user.id, organizationId },
    });
  }
}
