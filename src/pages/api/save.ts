import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // In a real app, you'd save to a database here
    // For demo, we'll just return success
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save changes' });
  }
}
