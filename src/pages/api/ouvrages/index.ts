import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('ouvrages');

  if (req.method === 'GET') {
    const { search } = req.query;
    let ouvrages;

    if (search) {
      const searchQuery = search.toString().toLowerCase();
      ouvrages = await collection.find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { author: { $regex: searchQuery, $options: 'i' } },
          { type: { $regex: searchQuery, $options: 'i' } },
        ],
      }).toArray();
    } else {
      ouvrages = await collection.find({}).toArray();
    }

    res.status(200).json(ouvrages);
  } else if (req.method === 'POST') {
    const { type, ...rest } = req.body;
    const newOuvrage = {
      _id: uuidv4(),
      ...rest,
      type,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
    };

    await collection.insertOne(newOuvrage);
    res.status(201).json(newOuvrage);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
