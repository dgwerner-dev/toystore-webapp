export interface Venda {
  data: string;
  valor: number;
}

export interface ClienteInfo {
  nomeCompleto: string;
  detalhes: {
    email: string;
    nascimento: string;
  };
}

export interface ClienteEstatisticas {
  vendas: Venda[];
}

export interface ClienteRaw {
  info: ClienteInfo;
  duplicado?: {
    nomeCompleto: string;
  };
  estatisticas: ClienteEstatisticas;
}

export interface ClienteNormalizado {
  id: string;
  nomeCompleto: string;
  email: string;
  nascimento: string;
  vendas: Venda[];
  totalVendas: number;
  mediaValorVenda: number;
  frequenciaCompras: number;
  primeiraLetraFaltante: string;
}

export interface ApiResponse {
  data: {
    clientes: ClienteRaw[];
  };
  meta: {
    registroTotal: number;
    pagina: number;
  };
  redundante: {
    status: string;
  };
}

export interface EstatisticasResponse {
  vendasPorDia: Array<{
    data: string;
    total: number;
  }>;
  clientes: ClienteNormalizado[];
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface ClienteForm {
  nomeCompleto: string;
  email: string;
  nascimento: string;
} 