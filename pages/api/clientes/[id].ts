import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const { id } = req.query;

    if (req.method === 'PUT') {
      const { nome, email, nascimento } = req.body;

      if (!nome || !email || !nascimento) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const cliente = await prisma.cliente.update({
        where: { id: String(id) },
        data: {
          nome,
          email,
          nascimento: new Date(nascimento),
        },
      });

      return res.status(200).json({ message: 'Cliente atualizado com sucesso', cliente });
    }

    if (req.method === 'DELETE') {
      await prisma.cliente.delete({
        where: { id: String(id) },
      });

      return res.status(200).json({ message: 'Cliente excluído com sucesso' });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
} 