'use client';

import { Cliente } from '@/types';
import { calcularEstatisticasCliente } from '@/utils/normalize';
import { Calendar, DollarSign, Mail, ShoppingCart } from 'lucide-react';

interface ClientesListProps {
  clientes: Cliente[];
}

export function ClientesList({ clientes }: ClientesListProps) {
  const stats = clientes.map(calcularEstatisticasCliente);

  return (
    <div className="bg-white rounded-lg shadow border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Lista de Clientes</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {stats.map((stat) => (
          <div key={stat.cliente.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {stat.cliente.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-gray-900">{stat.cliente.nome}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {stat.cliente.email}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(stat.cliente.nascimento).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Total: R$ {stat.totalVendas.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    {stat.frequenciaCompras} compras
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Letra faltante:</span>
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full font-bold text-sm">
                    {stat.primeiraLetraFaltante}
                  </span>
                </div>
              </div>
            </div>
            
            {stat.cliente.vendas.length > 0 && (
              <div className="mt-4 pl-13">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Histórico de Vendas:</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {stat.cliente.vendas.slice(0, 3).map((venda, index) => (
                    <div key={index} className="text-xs bg-gray-50 px-2 py-1 rounded">
                      <span className="font-medium">{new Date(venda.data).toLocaleDateString('pt-BR')}</span>
                      <span className="text-gray-500 ml-2">R$ {venda.valor.toFixed(2)}</span>
                    </div>
                  ))}
                  {stat.cliente.vendas.length > 3 && (
                    <div className="text-xs text-gray-500 px-2 py-1">
                      +{stat.cliente.vendas.length - 3} mais...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 