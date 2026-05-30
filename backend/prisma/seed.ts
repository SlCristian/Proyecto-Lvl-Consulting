import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();

async function main() {
  await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  await prisma.role.upsert({
    where: { name: 'TRABAJADOR' },
    update: {},
    create: { name: 'TRABAJADOR' },
  });

  console.log('Seed ejecutado: Roles creados.');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
