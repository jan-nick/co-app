import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { AuthBackendModule } from '@co-app/auth/backend';
import { VoteBallotsModule } from './vote-ballots/vote-ballots.module';
import { VoteOptionsModule } from './vote-options/vote-options.module';

@Module({
  controllers: [VotesController],
  imports: [AuthBackendModule, VoteBallotsModule, VoteOptionsModule],
  providers: [VotesService],
})
export class VotesModule {}
