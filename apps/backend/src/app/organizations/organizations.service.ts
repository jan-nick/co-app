import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(args: Prisma.OrganizationFindManyArgs) {
    return this.prisma.organization.findMany(args);
  }

  findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }
}
