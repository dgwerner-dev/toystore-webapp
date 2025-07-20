import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const usuario = await prisma.usuario.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });

  const clientes = await Promise.all([
    prisma.cliente.upsert({
      where: { email: 'ana.b@example.com' },
      update: {},
      create: {
        nome: 'Ana Beatriz Silva',
        email: 'ana.b@example.com',
        nascimento: new Date('1992-05-01'),
      },
    }),
    prisma.cliente.upsert({
      where: { email: 'cadu@example.com' },
      update: {},
      create: {
        nome: 'Carlos Eduardo Santos',
        email: 'cadu@example.com',
        nascimento: new Date('1987-08-15'),
      },
    }),
    prisma.cliente.upsert({
      where: { email: 'maria.f@example.com' },
      update: {},
      create: {
        nome: 'Maria Fernanda Costa',
        email: 'maria.f@example.com',
        nascimento: new Date('1995-12-20'),
      },
    }),
    prisma.cliente.upsert({
      where: { email: 'joao.p@example.com' },
      update: {},
      create: {
        nome: 'João Pedro Oliveira',
        email: 'joao.p@example.com',
        nascimento: new Date('1990-03-10'),
      },
    }),
    prisma.cliente.upsert({
      where: { email: 'luiza.g@example.com' },
      update: {},
      create: {
        nome: 'Luiza Gabriela Xavier',
        email: 'luiza.g@example.com',
        nascimento: new Date('1988-11-25'),
      },
    }),
  ]);

  const vendas = await Promise.all([
    prisma.venda.create({
      data: {
        clienteId: clientes[0].id,
        valor: 150,
        data: new Date('2024-01-01'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[0].id,
        valor: 50,
        data: new Date('2024-01-02'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[0].id,
        valor: 200,
        data: new Date('2024-01-05'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[1].id,
        valor: 300,
        data: new Date('2024-01-01'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[1].id,
        valor: 100,
        data: new Date('2024-01-03'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[1].id,
        valor: 250,
        data: new Date('2024-01-04'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[1].id,
        valor: 75,
        data: new Date('2024-01-06'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[2].id,
        valor: 500,
        data: new Date('2024-01-02'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[2].id,
        valor: 150,
        data: new Date('2024-01-07'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[4].id,
        valor: 120,
        data: new Date('2024-01-01'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[4].id,
        valor: 80,
        data: new Date('2024-01-02'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[4].id,
        valor: 95,
        data: new Date('2024-01-03'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[4].id,
        valor: 110,
        data: new Date('2024-01-04'),
      },
    }),
    prisma.venda.create({
      data: {
        clienteId: clientes[4].id,
        valor: 130,
        data: new Date('2024-01-05'),
      },
    }),
  ]);

  console.log('Dados de exemplo criados com sucesso!');
  console.log('Usuário:', usuario.email);
  console.log('Clientes criados:', clientes.length);
  console.log('Vendas criadas:', vendas.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 