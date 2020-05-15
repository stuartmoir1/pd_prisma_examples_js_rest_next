import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/filtersPosts?searchString=:searchString
export default async function handle(req, res) {
  const { searchString } = req.query;
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: searchString } },
        { content: { contains: searchString } }
      ]
    },
    include: { author: true }
  });
  res.json(posts);
}
