import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthBackendModule } from '@co-app/auth/backend';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AccessTokenGuard } from './auth/guards/access-token.guard';
import { OrganizationsModule } from './organizations/organizations.module';
import { MembersModule } from './members/members.module';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    AuthModule,
    AuthBackendModule,
    ConfigModule.forRoot(),
    MembersModule,
    OrganizationsModule,
    PrismaModule,
    UsersModule,
    VotesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
