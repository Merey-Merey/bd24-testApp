import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { userRepository } from '@/lib/database';
import { BitrixAPI } from '@/lib/bitrix';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, password, confirmPassword } = req.body;

    console.log('Registration attempt:', { name, email });

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Пароли не совпадают' });
    }

    const existingUser = userRepository.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    const result = userRepository.create({
      name,
      email,
      password,
    });

    console.log('User created in database:', result.lastInsertRowid);

    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      userId: result.lastInsertRowid,
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Ошибка при регистрации' });
  }
}