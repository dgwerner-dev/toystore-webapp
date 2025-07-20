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

    if (req.method === 'GET') {
      const clientes = await prisma.cliente.findMany({
        include: {
          vendas: true,
        },
      });

      const clientesFormatados = clientes.map(cliente => ({
        info: {
          nomeCompleto: cliente.nome,
          detalhes: {
            email: cliente.email,
            nascimento: cliente.nascimento.toISOString().split('T')[0],
          },
        },
        estatisticas: {
          vendas: cliente.vendas.map(venda => ({
            data: venda.data.toISOString().split('T')[0],
            valor: venda.valor,
          })),
        },
      }));

      return res.status(200).json({
        data: {
          clientes: clientesFormatados,
        },
        meta: {
          registroTotal: clientes.length,
          pagina: 1,
        },
        redundante: {
          status: 'ok',
        },
      });
    }

    if (req.method === 'POST') {
      const { nome, email, nascimento } = req.body;

      if (!nome || !email || !nascimento) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const cliente = await prisma.cliente.create({
        data: {
          nome,
          email,
          nascimento: new Date(nascimento),
        },
      });

      return res.status(201).json({ message: 'Cliente criado com sucesso', cliente });
    }

    return res.status(405).json({ error: 'Método não permitido' });
  } catch (error) {
    console.error('Erro na API:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
} 