'use client';

import { Layout } from '@/components/Layout';
import { useState } from 'react';

export default function ClientesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    nome: '',
    email: '',
    nascimento: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Dados de exemplo dos clientes
  const clientesExemplo = [
    {
      nome: 'Ana Beatriz',
      email: 'ana.b@example.com',
      nascimento: '1992-05-01',
      totalVendas: 200,
      compras: 2,
      letraFaltante: 'Q'
    },
    {
      nome: 'Carlos Eduardo',
      email: 'cadu@example.com',
      nascimento: '1987-08-15',
      totalVendas: 0,
      compras: 0,
      letraFaltante: 'F'
    },
    {
      nome: 'Maria Silva',
      email: 'maria.silva@example.com',
      nascimento: '1995-03-20',
      totalVendas: 150,
      compras: 1,
      letraFaltante: 'X'
    }
  ];

  // Filtrar clientes baseado no termo de busca
  const filteredClientes = clientesExemplo.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCliente = async () => {
    try {
      // Validação básica
      if (!addForm.nome || !addForm.email || !addForm.nascimento) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(addForm.email)) {
        alert('Por favor, insira um email válido.');
        return;
      }

      // Aqui você faria a chamada para a API de adição
      // await apiService.adicionarCliente(addForm);
      
      // Simular adição bem-sucedida
      alert('Cliente adicionado com sucesso!');
      
      // Limpar formulário e fechar modal
      setAddForm({ nome: '', email: '', nascimento: '' });
      setShowAddForm(false);
      
      // Aqui você recarregaria a lista de clientes
      // fetchClientes();
      
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      alert('Erro ao adicionar cliente. Tente novamente.');
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestão de Clientes
            </h2>
            <p className="text-gray-600">
              Visualize e gerencie todos os clientes cadastrados ({clientesExemplo.length} clientes)
            </p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Adicionar Cliente
          </button>
        </div>

        {/* Filtro de busca */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Clientes {searchTerm && `(${filteredClientes.length} encontrados)`}
          </h3>
          
          {filteredClientes.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum cliente encontrado com os filtros aplicados.' : 'Nenhum cliente cadastrado.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClientes.map((cliente, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{cliente.nome}</h4>
                      <p className="text-sm text-gray-500">{cliente.email}</p>
                      <p className="text-sm text-gray-500">Nascimento: {new Date(cliente.nascimento).toLocaleDateString('pt-BR')}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Total: R$ {cliente.totalVendas.toFixed(2)}</span>
                        <span className="text-sm text-gray-600">{cliente.compras} compras</span>
                        <span className="text-sm text-gray-600">Letra faltante: <span className="bg-gray-100 px-2 py-1 rounded">{cliente.letraFaltante}</span></span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Editar cliente">
                        ✏️ Editar
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Excluir cliente">
                        🗑️ Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Adicionar Cliente */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Adicionar Cliente</h3>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={addForm.nome}
                    onChange={(e) => setAddForm({...addForm, nome: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Digite o nome completo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={addForm.email}
                    onChange={(e) => setAddForm({...addForm, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Nascimento *
                  </label>
                  <input
                    type="date"
                    value={addForm.nascimento}
                    onChange={(e) => setAddForm({...addForm, nascimento: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleAddCliente}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
} 