import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthBackendModule } from '@co-app/auth/backend';

@Module({
  controllers: [UsersController],
  imports: [AuthBackendModule, ConfigModule],
  providers: [UsersService],
})
export class UsersModule {}
