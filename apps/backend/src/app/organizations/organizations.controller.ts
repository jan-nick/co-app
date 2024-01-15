import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { Prisma } from '@prisma/client';
import { ParseArgs } from '@co-app/utils/backend';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto
  ) {
    const organization = await this.organizationsService.update(
      id,
      updateOrganizationDto
    );

    return organization;
  }
}
