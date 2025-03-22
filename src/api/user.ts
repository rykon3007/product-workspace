import { NextApiRequest, NextApiResponse } from 'next';
import { getRepository } from 'typeorm';
import { User } from '@/domain/entities/User';
import { AppDataSource } from '@/infrastructure/data-source';

AppDataSource.initialize().catch((error) => console.log(error));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepository = getRepository(User);

  switch (req.method) {
    case 'GET':
      try {
        const users = await userRepository.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
      }
      break;

    case 'POST':
      try {
        const newUser = userRepository.create(req.body);
        const savedUser = await userRepository.save(newUser);
        res.status(201).json(savedUser);
      } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
      }
      break;

    case 'PUT':
      try {
        const user = await userRepository.findOne(req.body.id);
        if (user) {
          userRepository.merge(user, req.body);
          const updatedUser = await userRepository.save(user);
          res.status(200).json(updatedUser);
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
      }
      break;

    case 'DELETE':
      try {
        const user = await userRepository.findOne(req.body.id);
        if (user) {
          await userRepository.remove(user);
          res.status(200).json({ message: 'User deleted' });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
