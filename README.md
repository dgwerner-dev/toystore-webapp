# ToyStore Dashboard

Uma aplicação web moderna para gerenciamento de clientes e visualização de estatísticas de vendas, construída com Next.js, TypeScript e Tailwind CSS.

## Funcionalidades

- 🔐 **Autenticação simples** - Sistema de login com validação
- 👥 **Gestão de clientes** - Adicionar clientes com nome, email e data de nascimento
- 📊 **Dashboard interativo** - Visualização de estatísticas em tempo real
- 📈 **Gráficos de vendas** - Gráfico de linha mostrando vendas por dia
- 🏆 **Destaques visuais** - Clientes com maior volume, média e frequência de compras
- 🔤 **Letra faltante** - Identificação da primeira letra do alfabeto ausente no nome
- 🧹 **Normalização de dados** - Tratamento de dados desorganizados da API

## Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca de gráficos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones

## Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API ToyStore rodando localmente na porta 3000

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd toystore-webapp
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API:
   - Edite o arquivo `config.example.ts` se necessário
   - A URL padrão da API é `http://localhost:3000`

4. Execute a aplicação:
```bash
npm run dev
```

5. Acesse a aplicação em `http://localhost:3001`

## Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── dashboard/         # Página do dashboard
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial (login)
├── components/            # Componentes React
│   ├── ClienteForm.tsx    # Formulário de cliente
│   ├── ClientesList.tsx   # Lista de clientes
│   ├── ClientesStats.tsx  # Estatísticas dos clientes
│   ├── Layout.tsx         # Layout da aplicação
│   ├── LoginForm.tsx      # Formulário de login
│   └── VendasChart.tsx    # Gráfico de vendas
├── contexts/              # Contextos React
│   └── AuthContext.tsx    # Contexto de autenticação
├── services/              # Serviços da aplicação
│   └── api.ts            # Serviço de comunicação com API
├── types/                 # Definições de tipos TypeScript
│   └── index.ts          # Tipos da aplicação
└── utils/                 # Utilitários
    └── normalize.ts       # Funções de normalização de dados
```

## Funcionalidades Detalhadas

### Autenticação
- Formulário de login com validação
- Persistência de token no localStorage
- Redirecionamento automático após login

### Gestão de Clientes
- Formulário modal para adicionar clientes
- Validação de campos obrigatórios
- Integração com API para persistência

### Dashboard
- **Estatísticas destacadas:**
  - Cliente com maior volume de vendas
  - Cliente com maior média de valor por venda
  - Cliente com maior frequência de compras

- **Gráfico de vendas:**
  - Visualização de vendas por dia
  - Formatação de valores em reais
  - Responsivo e interativo

- **Lista de clientes:**
  - Tabela com informações completas
  - Estatísticas individuais por cliente
  - Campo de letra faltante no nome

### Normalização de Dados
A aplicação trata automaticamente dados desorganizados da API:
- Remove campos duplicados
- Extrai dados aninhados
- Calcula estatísticas derivadas
- Identifica letras faltantes no alfabeto

## API Esperada

A aplicação espera uma API com os seguintes endpoints:

- `POST /auth/login` - Autenticação
- `GET /clientes` - Listagem de clientes
- `POST /clientes` - Adicionar cliente

### Formato de Resposta da API de Clientes
```json
{
  "data": {
    "clientes": [
      {
        "info": {
          "nomeCompleto": "Ana Beatriz",
          "detalhes": {
            "email": "ana.b@example.com",
            "nascimento": "1992-05-01"
          }
        },
        "estatisticas": {
          "vendas": [
            { "data": "2024-01-01", "valor": 150 },
            { "data": "2024-01-02", "valor": 50 }
          ]
        }
      }
    ]
  },
  "meta": {
    "registroTotal": 1,
    "pagina": 1
  },
  "redundante": {
    "status": "ok"
  }
}
```

## Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Executa build de produção
- `npm run lint` - Executa linter

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
