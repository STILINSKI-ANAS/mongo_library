import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('ouvrages');

  const data = await collection.find({}).toArray();

  res.setHeader('Content-Disposition', 'attachment; filename="ouvrages.json"');
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(data);
}
