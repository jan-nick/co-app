import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UsersService } from '../users/users.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthBackendModule } from '@co-app/auth/backend';

@Module({
  controllers: [AuthController],
  imports: [
    AuthBackendModule,
    ConfigModule,
    JwtModule.register({}),
    PassportModule,
    UsersModule,
  ],
  providers: [AccessTokenStrategy, AuthService, LocalStrategy, UsersService],
})
export class AuthModule {}
