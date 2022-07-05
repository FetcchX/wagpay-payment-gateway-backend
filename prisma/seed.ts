import { PrismaClient } from "@prisma/client";
import pages from "./../data/pages";
import products from "./../data/products";
import submission from "./../data/submission";
import users from "./../data/users";

const prisma = new PrismaClient();

async function main() {
// await prisma.user.create({
//  data: users[0],
//});

 // await prisma.pages.createMany({
   // data: pages,
 // });

 // await prisma.product.createMany({
   // data: products,
 // });

 // await prisma.submission.createMany({
   // data: submission,
  //});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // {
  //   "embeds": [
  //     {
  //       "title": "Your store has been created",
  //       "description": "its not good tho",
  //       "color": 16763904
  //     },
  //     {
  //       "title": "You received a order from ray6969@69.69",
  //       "description": "don't get too happy, just $0.1",
  //       "color": 16763904,
  //       "fields": [
  //         {
  //           "name": "Product 1",
  //           "value": "Don't sell drugs on our platform"
  //         },
  //         {
  //           "name": "ray69",
  //           "value": "Why sell your username??"
  //         },
  //         {
  //           "name": "v3n0m",
  //           "value": "x"
  //         }
  //       ]
  //     }
  //   ]
  // }
