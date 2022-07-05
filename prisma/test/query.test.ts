/**
 * Database query testing:
 * @summary Takes 65 to 75 ms to query from Database
 */

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  let start: any = performance.now();
  await prisma.pages.findMany();
  let end: any = performance.now();
  console.log(`Time Taken: ${end - start}`);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
