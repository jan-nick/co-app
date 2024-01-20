import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthBackendModule } from '@co-app/auth/backend';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [MembersController],
  imports: [AuthBackendModule, ConfigModule, UsersModule],
  providers: [MembersService, UsersService],
})
export class MembersModule {}
