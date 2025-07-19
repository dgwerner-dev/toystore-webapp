import { ClienteNormalizado, ClienteRaw } from '@/types';

export function normalizarCliente(clienteRaw: ClienteRaw): ClienteNormalizado {
  const { info, estatisticas } = clienteRaw;
  
  // Extrair dados básicos
  const nomeCompleto = info.nomeCompleto;
  const email = info.detalhes.email;
  const nascimento = info.detalhes.nascimento;
  const vendas = estatisticas.vendas || [];
  
  // Calcular estatísticas
  const totalVendas = vendas.reduce((sum, venda) => sum + venda.valor, 0);
  const mediaValorVenda = vendas.length > 0 ? totalVendas / vendas.length : 0;
  const frequenciaCompras = vendas.length;
  
  // Calcular primeira letra faltante
  const primeiraLetraFaltante = calcularPrimeiraLetraFaltante(nomeCompleto);
  
  return {
    id: `${nomeCompleto}-${email}`.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    nomeCompleto,
    email,
    nascimento,
    vendas,
    totalVendas,
    mediaValorVenda,
    frequenciaCompras,
    primeiraLetraFaltante,
  };
}

export function calcularPrimeiraLetraFaltante(nome: string): string {
  const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
  const nomeLower = nome.toLowerCase().replace(/[^a-z]/g, '');
  
  for (const letra of alfabeto) {
    if (!nomeLower.includes(letra)) {
      return letra.toUpperCase();
    }
  }
  
  return '-';
}

export function agruparVendasPorDia(clientes: ClienteNormalizado[]) {
  const vendasPorDia: { [data: string]: number } = {};
  
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

export function encontrarClienteComMaiorVolume(clientes: ClienteNormalizado[]): ClienteNormalizado | null {
  if (clientes.length === 0) return null;
  return clientes.reduce((max, cliente) => 
    cliente.totalVendas > max.totalVendas ? cliente : max
  );
}

export function encontrarClienteComMaiorMedia(clientes: ClienteNormalizado[]): ClienteNormalizado | null {
  if (clientes.length === 0) return null;
  return clientes.reduce((max, cliente) => 
    cliente.mediaValorVenda > max.mediaValorVenda ? cliente : max
  );
}

export function encontrarClienteComMaiorFrequencia(clientes: ClienteNormalizado[]): ClienteNormalizado | null {
  if (clientes.length === 0) return null;
  return clientes.reduce((max, cliente) => 
    cliente.frequenciaCompras > max.frequenciaCompras ? cliente : max
  );
} 