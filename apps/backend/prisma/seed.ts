import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

console.log('prisma');

async function main() {
  console.log('main');
  const organization = await prisma.organization.create({
    data: { name: 'Example Coop', purpose: '' },
  });

  console.log(process.env['PASSWORD_HASH_SALT_ROUNDS']);
  const hashedPassword = await hash(
    'password123',
    Number(process.env['PASSWORD_HASH_SALT_ROUNDS'])
  );
  console.log(hashedPassword);

  const user = await prisma.user.create({
    data: {
      email: 'example@mail.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Example User',
    },
  });
  console.log(user);

  await prisma.member.create({
    data: {
      organizationId: organization.id,
      userId: user.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
