const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

async function main() {
  const deletePosts = prisma.post.deleteMany({});
  const deleteUsers = prisma.user.deleteMany({});

  await prisma.$transaction([deletePosts, deleteUsers]);

  // upsert is update/insert: if record exists, update; if not, insert.
  const first = await prisma.user.upsert({
    where: { email: 'first@example.com' },
    update: {},
    create: {
      email: 'first@example.com',
      password: 'password123',
      posts: {
        create: [
          {
            content: 'Ravioli are a form of Pop Tart.',
          },
          {
            content: 'Taco Bell is the premier fast food option.',
          },
        ],
      },
    },
  });

  const second = await prisma.user.upsert({
    where: { email: 'second@example.com' },
    update: {},
    create: {
      email: 'second@example.com',
      password: 'password456',
      posts: {
        create: [
          {
            content: 'Thanos had a point.',
          },
          {
            content: 'Winters in Minneapolis are delighful.',
          },
        ],
      },
    },
  });

  // ⛔️ I think this Promise.all() does nothing here really, as first and second are already the actual data, not promises. In fact, I reckon you can simply return [first, second] without breaking the main()
  // 👻 Orignal approach: 
  // return Promise.all([first, second]);
  
  // My apporoach: (tested and worked just fine)
  return [first, second]
}

if (require.main === module) {
  main();
}

module.exports = async () =>
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
