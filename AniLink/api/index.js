import express from 'express';
import { PrismaClient } from '@prisma/client';

const app =express();

app.listen(3000 ,()=>{
    console.log('Server is running on port 3000!!!!!!!')
})

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
//   console.log(allUsers);
// await prisma.user.create({
//   data: {
//     name: "hecky",
//     email: "hector@prisma.io",
//     posts: {
//       create: { title: "Hello World" },
//     },
//     profile: {
//       create: { bio: "I like turtles" },
//     },
//   },
// });

// const allUsers = await prisma.user.findMany({
//   include: {
//     // posts: true,
//     profile: true,
//   },
// });
console.dir(allUsers, { depth: null });
  
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