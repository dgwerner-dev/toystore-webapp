'use client';

import { ClienteNormalizado } from '@/types';
import { DollarSign, Repeat, ShoppingBag } from 'lucide-react';

interface ClientesStatsProps {
  clientes: ClienteNormalizado[];
}

export function ClientesStats({ clientes }: ClientesStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };



  // Encontrar clientes com maiores valores
  const clienteMaiorVolume = clientes.reduce((max, cliente) => 
    cliente.totalVendas > max.totalVendas ? cliente : max, 
    clientes[0] || { totalVendas: 0 }
  );

  const clienteMaiorMedia = clientes.reduce((max, cliente) => 
    cliente.mediaValorVenda > max.mediaValorVenda ? cliente : max, 
    clientes[0] || { mediaValorVenda: 0 }
  );

  const clienteMaiorFrequencia = clientes.reduce((max, cliente) => 
    cliente.frequenciaCompras > max.frequenciaCompras ? cliente : max, 
    clientes[0] || { frequenciaCompras: 0 }
  );

  if (clientes.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-500">Nenhum cliente encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Cliente com maior volume de vendas */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center mb-4">
          <DollarSign className="h-6 w-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Maior Volume
          </h3>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(clienteMaiorVolume.totalVendas)}
          </p>
          <p className="text-sm text-gray-600">
            {clienteMaiorVolume.nomeCompleto}
          </p>
          <p className="text-xs text-gray-500">
            {clienteMaiorVolume.frequenciaCompras} compras
          </p>
        </div>
      </div>

      {/* Cliente com maior média de valor por venda */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center mb-4">
          <ShoppingBag className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Maior Média
          </h3>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(clienteMaiorMedia.mediaValorVenda)}
          </p>
          <p className="text-sm text-gray-600">
            {clienteMaiorMedia.nomeCompleto}
          </p>
          <p className="text-xs text-gray-500">
            por compra
          </p>
        </div>
      </div>

      {/* Cliente com maior frequência de compras */}
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex items-center mb-4">
          <Repeat className="h-6 w-6 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Maior Frequência
          </h3>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-purple-600">
            {clienteMaiorFrequencia.frequenciaCompras}
          </p>
          <p className="text-sm text-gray-600">
            {clienteMaiorFrequencia.nomeCompleto}
          </p>
          <p className="text-xs text-gray-500">
            compras realizadas
          </p>
        </div>
      </div>
    </div>
  );
} 