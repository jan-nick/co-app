import { Module } from '@nestjs/common';
import { VoteOptionsService } from './vote-options.service';
import { VoteOptionsController } from './vote-options.controller';
import { AuthBackendModule } from '@co-app/auth/backend';

@Module({
  controllers: [VoteOptionsController],
  imports: [AuthBackendModule],
  providers: [VoteOptionsService],
})
export class VoteOptionsModule {}
