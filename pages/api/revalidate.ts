import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { secret} = req.body;

  // Validate the secret token
  if (secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    // Trigger revalidation for the specified path
    await res.revalidate('/'); // Defaults to the home page
    return res.json({ message: 'Revalidation successful' });
  } catch (error) {
    console.error('Error during revalidation:', error);
    return res.status(500).json({ error: 'Revalidation failed' });
  }
}
