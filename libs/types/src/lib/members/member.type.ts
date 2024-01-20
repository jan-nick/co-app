import { Member, User } from '@prisma/client';

export type MemberWithUser = Member & {
  user: User;
};
