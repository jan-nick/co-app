import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

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

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  findAllRoles(id: string) {
    return this.prisma.organizationRole.findMany({
      where: { organizationId: id },
    });
  }
}
