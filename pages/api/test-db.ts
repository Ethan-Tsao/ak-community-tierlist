import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create a sample operator
    const operator = await prisma.operator.create({
      data: {
        name: 'Exusiai',
        class: 'Sniper',
        rarity: 6,
        tier: 'S',
      },
    });

    res.status(200).json({ message: 'Operator created successfully', operator });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
