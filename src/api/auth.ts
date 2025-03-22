import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import { User } from '@/domain/entities/User';
import { AppDataSource } from '@/infrastructure/data-source';

AppDataSource.initialize().catch((error) => console.log(error));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = getRepository(User);

  if (req.method === 'POST') {
    const { id, password } = req.body;

    try {
      const user = await userRepository.findOne({ where: { id, password } });

      if (user) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid ID or password' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
