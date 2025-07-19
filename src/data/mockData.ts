import { ApiResponse } from '@/types';

export const mockApiResponse: ApiResponse = {
  data: {
    clientes: [
      {
        info: {
          nomeCompleto: "Ana Beatriz Silva",
          detalhes: {
            email: "ana.b@example.com",
            nascimento: "1992-05-01"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 150 },
            { data: "2024-01-02", valor: 50 },
            { data: "2024-01-05", valor: 200 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Carlos Eduardo Santos",
          detalhes: {
            email: "cadu@example.com",
            nascimento: "1987-08-15"
          }
        },
        duplicado: {
          nomeCompleto: "Carlos Eduardo Santos"
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 300 },
            { data: "2024-01-03", valor: 100 },
            { data: "2024-01-04", valor: 250 },
            { data: "2024-01-06", valor: 75 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "Maria Fernanda Costa",
          detalhes: {
            email: "maria.f@example.com",
            nascimento: "1995-12-20"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-02", valor: 500 },
            { data: "2024-01-07", valor: 150 }
          ]
        }
      },
      {
        info: {
          nomeCompleto: "João Pedro Oliveira",
          detalhes: {
            email: "joao.p@example.com",
            nascimento: "1990-03-10"
          }
        },
        estatisticas: {
          vendas: []
        }
      },
      {
        info: {
          nomeCompleto: "Luiza Gabriela Xavier",
          detalhes: {
            email: "luiza.g@example.com",
            nascimento: "1988-11-25"
          }
        },
        estatisticas: {
          vendas: [
            { data: "2024-01-01", valor: 120 },
            { data: "2024-01-02", valor: 80 },
            { data: "2024-01-03", valor: 95 },
            { data: "2024-01-04", valor: 110 },
            { data: "2024-01-05", valor: 130 }
          ]
        }
      }
    ]
  },
  meta: {
    registroTotal: 5,
    pagina: 1
  },
  redundante: {
    status: "ok"
  }
}; 