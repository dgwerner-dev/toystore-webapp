# ToyStore Dashboard

Sistema completo de gestão de clientes e vendas com dashboard interativo, construído com Next.js, TypeScript, Tailwind CSS e Prisma.

![Dashboard ToyStore](docs/images/dashboard-screenshot.png)

*Dashboard interativo com estatísticas de vendas, gráficos e gestão de clientes*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

## 🚀 Funcionalidades Implementadas

### ✅ **Autenticação Completa**
- Sistema de login com JWT
- Proteção de rotas
- Logout funcional com confirmação
- Persistência de sessão

### ✅ **CRUD Completo de Clientes**
- **Criar**: Modal para adicionar novos clientes
- **Ler**: Lista com busca e filtros
- **Atualizar**: Modal de edição inline
- **Excluir**: Confirmação antes de excluir
- Validação de formulários (nome, email, data)

### ✅ **Dashboard Interativo**
- **Cards de Destaque**: Maior volume, média e frequência
- **Gráfico de Vendas**: Por dia com Recharts
- **Estatísticas em Tempo Real**: Cálculos automáticos
- **Letra Faltante**: Primeira letra do alfabeto ausente no nome

### ✅ **Sistema de Dados**
- Banco SQLite com Prisma ORM
- Dados de exemplo pré-carregados
- Normalização automática de dados da API
- Fallback para dados mock quando API indisponível

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Gráficos**: Recharts
- **Backend**: Next.js API Routes
- **Database**: SQLite + Prisma ORM
- **Autenticação**: JWT + bcrypt
- **Validação**: React Hook Form + Zod

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## ⚡ Instalação e Execução

### 1. Clone e Instale
```bash
git clone https://github.com/dgwerner-dev/toystore-webapp.git
cd toystore-webapp
npm install
```

### 2. Configure o Banco de Dados
```bash
# Gera o cliente Prisma
npx prisma generate

# Cria o banco e aplica o schema
npx prisma db push

# Popula com dados de exemplo
npx tsx scripts/seed.ts
```

### 3. Execute a Aplicação
```bash
npm run dev
```

### 4. Acesse
- **URL**: http://localhost:3001
- **Email**: admin@example.com
- **Senha**: admin123

## 🏗️ Estrutura do Projeto

```
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── clientes/          # Gestão de clientes
│   │   └── page.tsx           # Página de login
│   ├── components/            # Componentes React
│   │   ├── Layout.tsx         # Layout com navegação
│   │   └── LoginForm.tsx      # Formulário de login
│   ├── contexts/              # Contextos React
│   │   └── AuthContext.tsx    # Autenticação global
│   ├── services/              # Serviços
│   │   └── api.ts            # Comunicação com API
│   ├── types/                 # Tipos TypeScript
│   │   └── index.ts          # Definições de tipos
│   ├── utils/                 # Utilitários
│   │   └── normalize.ts       # Normalização de dados
│   └── data/                  # Dados mock
│       └── mockData.ts        # Dados de exemplo
├── pages/api/                 # API Routes
│   ├── auth/login.ts         # Autenticação
│   └── clientes/             # CRUD de clientes
├── prisma/                   # Configuração do banco
│   ├── schema.prisma         # Schema do banco
│   └── dev.db               # Banco SQLite
├── lib/                      # Bibliotecas
│   └── auth.ts              # JWT helpers
└── scripts/                  # Scripts utilitários
    └── seed.ts              # População do banco
```

## 🎯 Funcionalidades Detalhadas

### **Dashboard (`/dashboard`)**
- **Cards de Destaque**: 
  - 🟢 Maior Volume de Vendas
  - 🔵 Maior Valor Médio
  - 🟣 Maior Frequência de Compras
- **Gráfico de Vendas**: Por dia com tooltips
- **Responsivo**: Adapta-se a diferentes telas

### **Preview da Interface**

| Funcionalidade | Descrição |
|----------------|-----------|
| ![Dashboard](docs/images/dashboard-screenshot.png) | **Dashboard Principal** - Visão geral com estatísticas e gráficos |
| **Gestão de Clientes** | Lista completa com busca, adição, edição e exclusão |
| **Autenticação** | Sistema de login seguro com JWT |
| **Responsividade** | Interface adaptativa para mobile, tablet e desktop |

### **Gestão de Clientes (`/clientes`)**
- **Lista Completa**: Com busca por nome/email
- **Adicionar Cliente**: Modal com validação
- **Editar Cliente**: Modal inline
- **Excluir Cliente**: Com confirmação
- **Estatísticas**: Total vendas, compras, letra faltante

### **Autenticação**
- **Login**: admin@example.com / admin123
- **Proteção**: Rotas protegidas automaticamente
- **Logout**: Com confirmação e limpeza de dados
- **Persistência**: Token salvo no localStorage

## 🔧 Configuração da API

### **Endpoints Implementados**
- `POST /api/auth/login` - Login com JWT
- `GET /api/clientes` - Listar clientes
- `POST /api/clientes` - Criar cliente
- `PUT /api/clientes/[id]` - Atualizar cliente
- `DELETE /api/clientes/[id]` - Excluir cliente

### **Formato de Dados**
```typescript
// Cliente
{
  id: string;
  nome: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
}

// Venda
{
  id: string;
  clienteId: string;
  valor: number;
  data: string;
}
```

## 🎨 Interface e UX

### **Design System**
- **Cores**: Verde (sucesso), Azul (info), Roxo (destaque)
- **Tipografia**: Hierarquia clara com Tailwind
- **Componentes**: Modais, cards, formulários consistentes
- **Feedback**: Loading states, mensagens de erro/sucesso

### **Responsividade**
- **Mobile**: Layout adaptativo
- **Tablet**: Grid responsivo
- **Desktop**: Layout otimizado

## 🧪 Dados de Exemplo

O sistema vem com dados pré-carregados:
- **5 clientes** com informações completas
- **14 vendas** distribuídas entre os clientes
- **Usuário admin** para login

## 🚀 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento (porta 3001)
npm run build        # Build de produção
npm run start        # Executar build
npm run lint         # Verificar código
npx prisma studio    # Interface do banco
```

## 🔍 Para o Avaliador

### **Como Testar**

1. **Instalação Rápida**:
   ```bash
   git clone https://github.com/dgwerner-dev/toystore-webapp.git
   cd toystore-webapp
   npm install
   npx prisma generate && npx prisma db push
   npx tsx scripts/seed.ts
   npm run dev
   ```

2. **Login**: admin@example.com / admin123

3. **Funcionalidades para Testar**:
   - ✅ Dashboard com gráficos e estatísticas
   - ✅ Adicionar/editar/excluir clientes
   - ✅ Busca e filtros
   - ✅ Logout funcional
   - ✅ Responsividade

### **Pontos de Destaque**

- **CRUD Completo**: Todas as operações funcionais
- **Autenticação Real**: JWT + banco de dados
- **UX Polida**: Loading states, confirmações, feedback
- **Código Limpo**: Estrutura natural e bem organizada
- **Dados Reais**: Banco SQLite com dados de exemplo

### **Tecnologias Modernas**
- Next.js 15 com App Router
- TypeScript para type safety
- Prisma ORM para banco de dados
- Tailwind CSS para styling
- Recharts para visualização

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.

---

**Desenvolvido com ❤️ usando tecnologias modernas**
