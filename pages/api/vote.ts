import { PrismaClient, VoteType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
// import cookie from 'cookie';
import requestIp from 'request-ip';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { operatorId, voteType } = req.body;
  const ipAddress = requestIp.getClientIp(req);

  if (!operatorId || !voteType || !ipAddress) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!(voteType in VoteType)) {
    return res.status(400).json({ error: 'Invalid voteType' });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingvote = await prisma.vote.findFirst({
      where: {
        operatorId,
        ipAddress: String(ipAddress),
        createdAt: {
          gte: today,
        },
      },
    });

    if (existingvote) {
      return res.status(400).json({ error: 'You can only vote once per operator per day' });
    }

    // const cookies = cookie.parse(req.headers.cookie || '');
    // let votesCookie = {};
    // try {
    //   votesCookie = cookies.votes ? JSON.parse(cookies.votes) : {};
    // } catch (err) {
    //   console.error('Failed to parse votes cookie:', err);
    // }

    // if (votesCookie[operatorId] && new Date(votesCookie[operatorId]).getTime() >= today.getTime()) {
    //   return res.status(400).json({ error: 'You can only vote once per operator per day' });
    // }

    await prisma.vote.create({
      data: {
        operatorId,
        ipAddress: String(ipAddress),
        voteType,
      },
    });

    const revalidateResponse = await fetch(`${process.env.BASE_URL}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.REVALIDATION_TOKEN,
        path: '/',
      }),
    });
    console.log("revalidation failed")

    if (!revalidateResponse.ok) {
      console.error('Revalidation failed:', await revalidateResponse.text());
    }

    // votesCookie[operatorId] = new Date().toISOString();
    // res.setHeader(
    //   'Set-Cookie',
    //   cookie.serialize('votes', JSON.stringify(votesCookie), {
    //     path: '/',
    //     httpOnly: true,
    //     maxAge: 24 * 60 * 60, // 1 day
    //   })
    // );

    return res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error('Error recording vote:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
