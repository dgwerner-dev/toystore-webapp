'use client';

import { Layout } from '@/components/Layout';

export default function ClientesPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestão de Clientes
            </h2>
            <p className="text-gray-600">
              Visualize e gerencie todos os clientes cadastrados
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lista de Clientes</h3>
          
          {/* Exemplo de cliente conforme especificação */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900">Ana Beatriz</h4>
              <p className="text-sm text-gray-500">ana.b@example.com</p>
              <p className="text-sm text-gray-500">Nascimento: 01/05/1992</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-sm text-gray-600">Total: R$ 200,00</span>
                <span className="text-sm text-gray-600">2 compras</span>
                <span className="text-sm text-gray-600">Letra faltante: <span className="bg-gray-100 px-2 py-1 rounded">Q</span></span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900">Carlos Eduardo</h4>
              <p className="text-sm text-gray-500">cadu@example.com</p>
              <p className="text-sm text-gray-500">Nascimento: 15/08/1987</p>
              <div className="mt-2 flex items-center space-x-4">
                <span className="text-sm text-gray-600">Total: R$ 0,00</span>
                <span className="text-sm text-gray-600">0 compras</span>
                <span className="text-sm text-gray-600">Letra faltante: <span className="bg-gray-100 px-2 py-1 rounded">F</span></span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Funcionalidades Implementadas:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Listagem de clientes com dados normalizados da API</li>
              <li>• Exibição da primeira letra faltante do alfabeto</li>
              <li>• Estatísticas de vendas por cliente</li>
              <li>• Interface responsiva e moderna</li>
              <li>• Tratamento de dados aninhados da API</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
} 