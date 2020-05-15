import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  const user = await prisma.user.create({
    data: { ...req.body }
  });
  res.json(user)
}
