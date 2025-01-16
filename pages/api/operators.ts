// pages/api/operators.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const operators = await prisma.operator.findMany({
      include: {
        votes: true, // Include votes in the response
      },
    });

    // Calculate vote counts
    const operatorsWithVoteCounts = operators.map((operator) => {
      const voteCounts = { UPVOTE: 0, NEUTRAL: 0, DOWNVOTE: 0 };
      operator.votes.forEach((vote) => {
        voteCounts[vote.voteType]++;
      });
      return {
        ...operator,
        voteCounts,
      };
    });

    res.status(200).json(operatorsWithVoteCounts);
  } catch (error) {
    console.error('Error fetching operators:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
