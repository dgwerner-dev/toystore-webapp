# Instruções de Uso - ToyStore Dashboard

## 🚀 Como Executar

### 1. Instalação
```bash
npm install
```

### 2. Configuração
- Edite o arquivo `config.example.ts` se necessário
- A URL padrão da API é `http://localhost:3000`

### 3. Execução
```bash
npm run dev
```

### 4. Acesso
- Abra `http://localhost:3001` no navegador
- Use as credenciais de demonstração:
  - Email: `admin@toystore.com`
  - Senha: `admin123`

## 📋 Funcionalidades Implementadas

### ✅ Autenticação
- Sistema de login com validação
- Persistência de token no localStorage
- Redirecionamento automático após login

### ✅ Gestão de Clientes
- Formulário modal para adicionar clientes
- Validação de campos obrigatórios (nome, email, data de nascimento)
- Integração com API para persistência

### ✅ Dashboard com Estatísticas
- **Cliente com maior volume de vendas** (destacado em verde)
- **Cliente com maior média de valor por venda** (destacado em azul)
- **Cliente com maior frequência de compras** (destacado em roxo)

### ✅ Gráfico de Vendas
- Visualização de vendas por dia usando Recharts
- Formatação de valores em reais (R$)
- Gráfico responsivo e interativo

### ✅ Lista de Clientes
- Tabela completa com informações dos clientes
- Estatísticas individuais por cliente
- **Campo de letra faltante**: mostra a primeira letra do alfabeto (A-Z) que não aparece no nome
- Se todas as letras estiverem presentes, exibe "-"

### ✅ Normalização de Dados
A aplicação trata automaticamente dados desorganizados da API:
- Remove campos duplicados (ex: `duplicado.nomeCompleto`)
- Extrai dados aninhados (ex: `info.detalhes.email`)
- Calcula estatísticas derivadas (total, média, frequência)
- Identifica letras faltantes no alfabeto

### ✅ Modo de Demonstração
- Se a API não estiver disponível, usa dados mock
- Aviso visual quando em modo de demonstração
- Botão de adicionar cliente desabilitado em modo demo

## 🎯 Exemplos de Dados Processados

### Dados da API (estrutura desorganizada):
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
      },
      {
        "info": {
          "nomeCompleto": "Carlos Eduardo",
          "detalhes": {
            "email": "cadu@example.com",
            "nascimento": "1987-08-15"
          }
        },
        "duplicado": {
          "nomeCompleto": "Carlos Eduardo"
        },
        "estatisticas": {
          "vendas": []
        }
      }
    ]
  },
  "meta": {
    "registroTotal": 2,
    "pagina": 1
  },
  "redundante": {
    "status": "ok"
  }
}
```

### Dados Normalizados:
```typescript
{
  id: "ana-beatriz-ana.b@example.com",
  nomeCompleto: "Ana Beatriz",
  email: "ana.b@example.com",
  nascimento: "1992-05-01",
  vendas: [
    { data: "2024-01-01", valor: 150 },
    { data: "2024-01-02", valor: 50 }
  ],
  totalVendas: 200,
  mediaValorVenda: 100,
  frequenciaCompras: 2,
  primeiraLetraFaltante: "C" // Primeira letra do alfabeto ausente
}
```

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca de gráficos
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

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
│   ├── DemoWarning.tsx    # Aviso de modo demo
│   ├── Layout.tsx         # Layout da aplicação
│   ├── LoginForm.tsx      # Formulário de login
│   └── VendasChart.tsx    # Gráfico de vendas
├── contexts/              # Contextos React
│   └── AuthContext.tsx    # Contexto de autenticação
├── data/                  # Dados mock
│   └── mockData.ts        # Dados de demonstração
├── services/              # Serviços da aplicação
│   └── api.ts            # Serviço de comunicação com API
├── types/                 # Definições de tipos TypeScript
│   └── index.ts          # Tipos da aplicação
└── utils/                 # Utilitários
    └── normalize.ts       # Funções de normalização de dados
```

## 🎨 Interface

A aplicação possui uma interface moderna e responsiva com:

- **Design System**: Cores consistentes (azul, verde, roxo, amarelo)
- **Componentes Reutilizáveis**: Formulários, tabelas, gráficos
- **Feedback Visual**: Loading states, mensagens de erro, avisos
- **Responsividade**: Funciona em desktop e mobile
- **Acessibilidade**: Labels, contrastes adequados, navegação por teclado

## 🔍 Funcionalidades Especiais

### Cálculo de Letra Faltante
Para cada cliente, a aplicação identifica a primeira letra do alfabeto (A-Z) que não aparece no nome completo:

- "Ana Beatriz" → "C" (primeira letra ausente)
- "Carlos Eduardo" → "F" (primeira letra ausente)
- "abcdefghijklmnopqrstuvwxyz" → "-" (todas as letras presentes)

### Estatísticas Automáticas
- **Total de vendas**: Soma de todos os valores
- **Média por venda**: Total dividido pelo número de vendas
- **Frequência**: Número total de compras

### Destaques Visuais
- Cliente com maior volume: borda verde
- Cliente com maior média: borda azul
- Cliente com maior frequência: borda roxa

## 🚨 Tratamento de Erros

- **API indisponível**: Usa dados mock com aviso
- **Erro de rede**: Mensagem de erro com botão de retry
- **Validação de formulários**: Mensagens específicas por campo
- **Autenticação**: Redirecionamento e limpeza de dados

## 📊 Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Memoização**: Dados processados uma única vez
- **Otimização de imagens**: Next.js Image component
- **Bundle splitting**: Código dividido automaticamente

## 🔐 Segurança

- **Validação de entrada**: Zod schemas
- **Sanitização de dados**: Remoção de campos desnecessários
- **Token management**: Armazenamento seguro no localStorage
- **CORS**: Configuração adequada para APIs

## 🎯 Próximos Passos

Para integrar com uma API real:

1. Configure a URL da API em `config.example.ts`
2. Implemente os endpoints necessários:
   - `POST /auth/login`
   - `GET /clientes`
   - `POST /clientes`
3. Ajuste os tipos em `src/types/index.ts` se necessário
4. Teste a integração

A aplicação está pronta para uso e demonstração! 