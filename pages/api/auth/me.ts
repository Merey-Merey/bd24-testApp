import { NextApiRequest, NextApiResponse } from 'next';
import { userRepository } from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const users = userRepository.findAll();
    if (users.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const user = users[0];
    const { password: _, ...userWithoutPassword } = user;
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Ошибка при получении данных пользователя' });
  }
}