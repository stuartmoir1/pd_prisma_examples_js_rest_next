import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const id = req.query.id;

  if (req.method === 'GET') {
    handleGET(id, res);
  } else if (req.method === 'DELETE') {
    handleDELETE(id, res);
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route`);
  }
}

// GET /api/post/:id
async function handleGET(id, res) {
  const post = await prisma.post.findOne({
    where: { id: Number(id) },
    include: { author: true }
  });
  res.json(post);
}

// DELETE /api/post/:id
async function  handleDELETE(id, res) {
  const post = await prisma.post.delete({
    where: { id: Number(id) }
  });
  res.json(post);
}
