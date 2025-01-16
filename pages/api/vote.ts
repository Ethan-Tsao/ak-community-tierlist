import { PrismaClient, VoteType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { operatorId, voteType } = req.body;
  console.log(req.body)

  if (!operatorId || !voteType) {
    return res.status(400).json({ error: 'Missing operatorId or voteType' });
  }

  if (!Object.values(VoteType).includes(voteType)) {
    return res.status(400).json({ error: 'Invalid voteType' });
  }

  try {
    await prisma.vote.create({
      data: {
        operatorId,
        voteType,
      },
    });

    return res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
