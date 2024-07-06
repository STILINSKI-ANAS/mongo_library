import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

const calculateStatistics = (ouvrages) => {
  const now = new Date();
  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(now.getDate() - 1);

  const totalBooks = ouvrages.filter(ouvrage => ouvrage.type === 'book').length;
  const totalPeriodicals = ouvrages.filter(ouvrage => ouvrage.type === 'periodical').length;
  const recentAdditions = ouvrages.filter(ouvrage => new Date(ouvrage.created_at) > oneDayAgo).length;

  const booksLast24Hours = ouvrages.filter(ouvrage => ouvrage.type === 'book' && new Date(ouvrage.created_at) > oneDayAgo).length;
  const periodicalsLast24Hours = ouvrages.filter(ouvrage => ouvrage.type === 'periodical' && new Date(ouvrage.created_at) > oneDayAgo).length;

  const growth = {
    books: totalBooks > 0 ? (booksLast24Hours / totalBooks) * 100 : 0,
    periodicals: totalPeriodicals > 0 ? (periodicalsLast24Hours / totalPeriodicals) * 100 : 0,
    additions: recentAdditions > 0 ? (recentAdditions / ouvrages.length) * 100 : 0,
  };

  return {
    totalBooks,
    totalPeriodicals,
    recentAdditions,
    growth
  };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const collection = db.collection('ouvrages');

  const ouvrages = await collection.find({}).toArray();
  const statistics = calculateStatistics(ouvrages);

  res.status(200).json(statistics);
}
