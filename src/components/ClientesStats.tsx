'use client';

import { Cliente } from '@/types';
import { calcularDestaques, calcularEstatisticasCliente } from '@/utils/normalize';
import { Award, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

interface ClientesStatsProps {
  clientes: Cliente[];
}

export function ClientesStats({ clientes }: ClientesStatsProps) {
  const destaques = calcularDestaques(clientes);
  const stats = clientes.map(calcularEstatisticasCliente);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas dos Clientes</h3>
      
      {/* Cards de estatísticas gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total de Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{clientes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total de Vendas</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {stats.reduce((sum, stat) => sum + stat.totalVendas, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total de Transações</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.reduce((sum, stat) => sum + stat.frequenciaCompras, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Média por Venda</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {(stats.reduce((sum, stat) => sum + stat.totalVendas, 0) / 
                     Math.max(stats.reduce((sum, stat) => sum + stat.frequenciaCompras, 0), 1)).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Destaques dos clientes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Maior Volume */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
          <h4 className="font-semibold mb-2">Maior Volume de Vendas</h4>
          {destaques.maiorVolume ? (
            <div>
              <p className="text-xl font-bold">{destaques.maiorVolume.cliente.nome}</p>
              <p className="text-blue-100">R$ {destaques.maiorVolume.totalVendas.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-blue-100">Nenhum cliente</p>
          )}
        </div>

        {/* Maior Média */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
          <h4 className="font-semibold mb-2">Maior Média por Venda</h4>
          {destaques.maiorMedia ? (
            <div>
              <p className="text-xl font-bold">{destaques.maiorMedia.cliente.nome}</p>
              <p className="text-green-100">R$ {destaques.maiorMedia.mediaValor.toFixed(2)}</p>
            </div>
          ) : (
            <p className="text-green-100">Nenhum cliente</p>
          )}
        </div>

        {/* Maior Frequência */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
          <h4 className="font-semibold mb-2">Maior Frequência de Compras</h4>
          {destaques.maiorFrequencia ? (
            <div>
              <p className="text-xl font-bold">{destaques.maiorFrequencia.cliente.nome}</p>
              <p className="text-purple-100">{destaques.maiorFrequencia.frequenciaCompras} compras</p>
            </div>
          ) : (
            <p className="text-purple-100">Nenhum cliente</p>
          )}
        </div>
      </div>

      {/* Lista de clientes com primeira letra faltante */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Clientes e Primeira Letra Faltante</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {stats.map((stat) => (
            <div key={stat.cliente.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{stat.cliente.nome}</p>
                <p className="text-sm text-gray-500">{stat.cliente.email}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total: R$ {stat.totalVendas.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{stat.frequenciaCompras} compras</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Letra faltante:</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full font-bold text-sm">
                    {stat.primeiraLetraFaltante}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 