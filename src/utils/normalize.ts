import { Cliente, ClienteAPI, ClienteDestaque, ClienteStats } from '@/types';

// Função para normalizar dados da API
export function normalizarCliente(clienteAPI: ClienteAPI): Cliente {
  return {
    id: Math.random().toString(36).substr(2, 9), // ID temporário
    nome: clienteAPI.info.nomeCompleto,
    email: clienteAPI.info.detalhes.email,
    nascimento: clienteAPI.info.detalhes.nascimento,
    vendas: clienteAPI.estatisticas.vendas.map((venda, index) => ({
      id: Math.random().toString(36).substr(2, 9),
      clienteId: Math.random().toString(36).substr(2, 9),
      valor: venda.valor,
      data: venda.data,
    })),
  };
}

// Função para agrupar vendas por dia
export function agruparVendasPorDia(clientes: Cliente[]) {
  const vendasPorDia: { [key: string]: number } = {};

  clientes.forEach(cliente => {
    cliente.vendas.forEach(venda => {
      const data = venda.data;
      vendasPorDia[data] = (vendasPorDia[data] || 0) + venda.valor;
    });
  });

  return Object.entries(vendasPorDia)
    .map(([data, total]) => ({ data, total }))
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
}

// Função para calcular estatísticas de um cliente
export function calcularEstatisticasCliente(cliente: Cliente): ClienteStats {
  const totalVendas = cliente.vendas.reduce((sum, venda) => sum + venda.valor, 0);
  const mediaValor = cliente.vendas.length > 0 ? totalVendas / cliente.vendas.length : 0;
  const frequenciaCompras = cliente.vendas.length;
  const primeiraLetraFaltante = encontrarPrimeiraLetraFaltante(cliente.nome);

  return {
    cliente,
    totalVendas,
    mediaValor,
    frequenciaCompras,
    primeiraLetraFaltante,
  };
}

// Função para encontrar a primeira letra do alfabeto que não aparece no nome
export function encontrarPrimeiraLetraFaltante(nome: string): string {
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
  const nomeLower = nome.toLowerCase();
  
  for (const letra of alfabeto) {
    if (!nomeLower.includes(letra)) {
      return letra.toUpperCase();
    }
  }
  
  return '-'; // Todas as letras estão presentes
}

// Função para calcular destaques dos clientes
export function calcularDestaques(clientes: Cliente[]): ClienteDestaque {
  const stats = clientes.map(calcularEstatisticasCliente);
  
  const maiorVolume = stats.reduce((max, current) => 
    current.totalVendas > (max?.totalVendas || 0) ? current : max, null as ClienteStats | null);
  
  const maiorMedia = stats.reduce((max, current) => 
    current.mediaValor > (max?.mediaValor || 0) ? current : max, null as ClienteStats | null);
  
  const maiorFrequencia = stats.reduce((max, current) => 
    current.frequenciaCompras > (max?.frequenciaCompras || 0) ? current : max, null as ClienteStats | null);
  
  return {
    maiorVolume,
    maiorMedia,
    maiorFrequencia,
  };
} 