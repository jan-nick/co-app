import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthBackendModule } from '@co-app/auth/backend';

@Module({
  controllers: [OrganizationsController],
  imports: [AuthBackendModule, ConfigModule],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
