import { NextApiRequest, NextApiResponse } from 'next';
import { AppDataSource } from '@/infrastructure/data-source';
import { User } from '@/domain/entities/User';

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userRepository = AppDataSource.getRepository(User);

  switch (req.method) {
    case 'GET':
      try {
        const users = await userRepository.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
      }
      break;

    case 'POST':
      try {
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(savedUser);
      } catch (error) {
        res.status(500).json({ message: 'Error saving user', error });
      }
      break;

    case 'PUT':
      try {
        const userToUpdate = await userRepository.findOneBy({ id: req.body.id });
        if (!userToUpdate) {
          res.status(404).json({ message: 'User not found' });
          break;
        }
        userRepository.merge(userToUpdate, req.body);
        const updatedUser = await userRepository.save(userToUpdate);
        res.status(200).json(updatedUser);
      } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
      }
      break;

    case 'DELETE':
      try {
        const userToDelete = await userRepository.findOneBy({ id: req.body.id });
        if (!userToDelete) {
          res.status(404).json({ message: 'User not found' });
          break;
        }
        await userRepository.remove(userToDelete);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
