import { Controller, Get, Param } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll(@ParseArgs() args: Prisma.OrganizationFindManyArgs) {
    const organizations = await this.organizationsService.findAll(args);
    return organizations;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const organization = await this.organizationsService.findOne(id);
    return organization;
  }
}
