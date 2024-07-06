import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('ouvrages');
  const { id } = req.query;
  const ouvrageId = id as string;

  if (req.method === 'PUT') {
    const { type, ...rest } = req.body;
    const updatedOuvrage = {
      ...rest,
      type,
      modified_at: new Date().toISOString(),
    };

    // Conditionally include fields based on the type
    if (type === 'book') {
      updatedOuvrage.author = req.body.author;
      updatedOuvrage.edition = req.body.edition;
      updatedOuvrage.year = req.body.year;
    } else if (type === 'periodical') {
      updatedOuvrage.periodicity = req.body.periodicity;
      updatedOuvrage.publicationDate = req.body.publicationDate;
    }

    await collection.updateOne({ _id: ouvrageId }, { $set: updatedOuvrage });
    res.status(200).json(updatedOuvrage);
  } else if (req.method === 'DELETE') {
    await collection.deleteOne({ _id: ouvrageId });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
