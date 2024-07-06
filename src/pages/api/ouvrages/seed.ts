import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';

const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateDummyData = () => {
  const dummyData = [];
  for (let i = 0; i < 20; i++) {
    const isBook = Math.random() > 0.5;
    const createdAt = randomDate(new Date('2024-05-01'), new Date('2024-07-01')).toISOString();

    if (isBook) {
      dummyData.push({
        _id: uuidv4(),
        title: `Book ${i + 1}`,
        author: `Author ${i + 1}`,
        edition: `Edition ${i + 1}`,
        year: `2024`,
        exemplaire: `${Math.floor(Math.random() * 10) + 1}`,
        created_at: createdAt,
        modified_at: createdAt,
        type: 'book',
      });
    } else {
      dummyData.push({
        _id: uuidv4(),
        title: `Periodical ${i + 1}`,
        periodicity: ['hebdomadaire', 'mensuel', 'journalier'][Math.floor(Math.random() * 3)],
        publicationDate: randomDate(new Date('2024-01-01'), new Date('2024-12-31')).toISOString().split('T')[0],
        exemplaire: `${Math.floor(Math.random() * 10) + 1}`,
        created_at: createdAt,
        modified_at: createdAt,
        type: 'periodical',
      });
    }
  }
  return dummyData;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('ouvrages');

  const dummyData = generateDummyData();

  await collection.insertMany(dummyData);

  res.status(200).json({ message: '20 dummy data entries inserted' });
}
