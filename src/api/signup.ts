import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '@/infrastructure/data-source';
import { User } from '@/domain/entities/User';

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((err) => {
  console.error('Error during Data Source initialization:', err);
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOneBy({ username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const newUser = new User();
    newUser.username = username;
    newUser.password = password;

    await userRepository.save(newUser);

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
