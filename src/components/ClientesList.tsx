'use client';

import { ClienteNormalizado } from '@/types';
import { DollarSign, Mail, Repeat, ShoppingBag, Type, Users } from 'lucide-react';

interface ClientesListProps {
  clientes: ClienteNormalizado[];
}

export function ClientesList({ clientes }: ClientesListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (clientes.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Nenhum cliente encontrado</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Users className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">
            Lista de Clientes ({clientes.length})
          </h3>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estatísticas
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Letra Faltante
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {cliente.nomeCompleto.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {cliente.nomeCompleto}
                      </div>
                      <div className="text-sm text-gray-500">
                        Nascimento: {formatDate(cliente.nascimento)}
                      </div>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    {cliente.email}
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-gray-900 font-medium">
                        {formatCurrency(cliente.totalVendas)}
                      </span>
                      <span className="text-gray-500 ml-1">total</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <ShoppingBag className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-gray-900 font-medium">
                        {formatCurrency(cliente.mediaValorVenda)}
                      </span>
                      <span className="text-gray-500 ml-1">média</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Repeat className="h-4 w-4 text-purple-500 mr-1" />
                      <span className="text-gray-900 font-medium">
                        {cliente.frequenciaCompras}
                      </span>
                      <span className="text-gray-500 ml-1">compras</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Type className="h-4 w-4 text-gray-400 mr-2" />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cliente.primeiraLetraFaltante === '-' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {cliente.primeiraLetraFaltante}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 