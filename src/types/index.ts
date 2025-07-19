// Tipos para a API
export interface Cliente {
  id: string;
  nome: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
}

export interface Venda {
  id: string;
  clienteId: string;
  valor: number;
  data: string;
}

// Novo formato da API
export interface ClienteAPI {
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  duplicado?: {
    nomeCompleto: string;
  };
  estatisticas: {
    vendas: Array<{
      data: string;
      valor: number;
    }>;
  };
}

export interface ApiResponse {
  data: {
    clientes: ClienteAPI[];
  };
  meta: {
    registroTotal: number;
    pagina: number;
  };
  redundante: {
    status: string;
  };
}

export interface ClienteForm {
  nome: string;
  email: string;
  nascimento: string;
}

export interface EstatisticasResponse {
  vendasPorDia: Array<{
    data: string;
    total: number;
  }>;
  clientes: Cliente[];
}

// Tipos para estatísticas
export interface ClienteStats {
  cliente: Cliente;
  totalVendas: number;
  mediaValor: number;
  frequenciaCompras: number;
  primeiraLetraFaltante: string;
}

export interface ClienteDestaque {
  maiorVolume: ClienteStats | null;
  maiorMedia: ClienteStats | null;
  maiorFrequencia: ClienteStats | null;
} 