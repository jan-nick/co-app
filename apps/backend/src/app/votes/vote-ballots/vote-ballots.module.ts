import { Module } from '@nestjs/common';
import { VoteBallotsService } from './vote-ballots.service';
import { VoteBallotsController } from './vote-ballots.controller';
import { AuthBackendModule } from '@co-app/auth/backend';

@Module({
  controllers: [VoteBallotsController],
  imports: [AuthBackendModule],
  providers: [VoteBallotsService],
})
export class VoteBallotsModule {}
