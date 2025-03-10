import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { snapshotId } = req.query;

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ snapshotId });

  // Redirect to the homepage with preview mode enabled
  res.redirect('/');
}
