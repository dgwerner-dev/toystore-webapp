'use client';

import { Layout } from '@/components/Layout';
import { apiService } from '@/services/api';
import { Cliente, ClienteForm } from '@/types';
import { calcularEstatisticasCliente, encontrarPrimeiraLetraFaltante, normalizarCliente } from '@/utils/normalize';
import { useEffect, useState } from 'react';

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState<ClienteForm>({
    nome: '',
    email: '',
    nascimento: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const carregarClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getClientes();
      const clientesNormalizados = response.data.clientes.map(normalizarCliente);
      setClientes(clientesNormalizados);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      setError('Erro ao carregar clientes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const clientesFiltrados = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validarFormulario = (data: ClienteForm): boolean => {
    if (!data.nome || !data.email || !data.nascimento) {
      alert('Por favor, preencha todos os campos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Por favor, insira um email válido.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validarFormulario(formData)) return;

    try {
      await apiService.adicionarCliente(formData);
      alert('Cliente adicionado com sucesso!');
      
      setFormData({ nome: '', email: '', nascimento: '' });
      setShowAddForm(false);
      carregarClientes();
      
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      alert('Erro ao adicionar cliente. Tente novamente.');
    }
  };

  const handleEdit = async (cliente: Cliente) => {
    try {
      const dadosAtualizados: ClienteForm = {
        nome: cliente.nome,
        email: cliente.email,
        nascimento: cliente.nascimento
      };
      
      await apiService.editarCliente(cliente.id, dadosAtualizados);
      alert('Cliente editado com sucesso!');
      setEditingCliente(null);
      carregarClientes();
      
    } catch (err) {
      console.error('Erro ao editar cliente:', err);
      alert('Erro ao editar cliente. Tente novamente.');
    }
  };

  const handleDelete = async (clienteId: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;

    try {
      await apiService.excluirCliente(clienteId);
      alert('Cliente excluído com sucesso!');
      carregarClientes();
      
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      alert('Erro ao excluir cliente. Tente novamente.');
    }
  };

  const renderClienteCard = (cliente: Cliente) => {
    const stats = calcularEstatisticasCliente(cliente);
    const letraFaltante = encontrarPrimeiraLetraFaltante(cliente.nome);
    
    return (
      <div key={cliente.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{cliente.nome}</h4>
            <p className="text-sm text-gray-500">{cliente.email}</p>
            <p className="text-sm text-gray-500">
              Nascimento: {new Date(cliente.nascimento).toLocaleDateString('pt-BR')}
            </p>
            <div className="mt-2 flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Total: R$ {stats.totalVendas.toFixed(2)}
              </span>
              <span className="text-sm text-gray-600">
                {stats.frequenciaCompras} compras
              </span>
              <span className="text-sm text-gray-600">
                Letra faltante: <span className="bg-gray-100 px-2 py-1 rounded">{letraFaltante}</span>
              </span>
            </div>
          </div>
          <div className="flex space-x-2 ml-4">
            <button 
              onClick={() => setEditingCliente(cliente)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors" 
              title="Editar cliente"
            >
              ✏️ Editar
            </button>
            <button 
              onClick={() => handleDelete(cliente.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors" 
              title="Excluir cliente"
            >
              🗑️ Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderModal = (title: string, cliente: ClienteForm, onSubmit: () => void, onClose: () => void) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
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
              value={cliente.nome}
              onChange={(e) => setFormData({...cliente, nome: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
              value={cliente.email}
              onChange={(e) => setFormData({...cliente, email: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
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
              value={cliente.nascimento}
              onChange={(e) => setFormData({...cliente, nascimento: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              {title === 'Adicionar Cliente' ? 'Adicionar' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando clientes...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={carregarClientes}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestão de Clientes</h2>
            <p className="text-gray-600">
              Visualize e gerencie todos os clientes cadastrados ({clientes.length} clientes)
            </p>
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Adicionar Cliente
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lista de Clientes {searchTerm && `(${clientesFiltrados.length} encontrados)`}
          </h3>
          
          {clientesFiltrados.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm ? 'Nenhum cliente encontrado com os filtros aplicados.' : 'Nenhum cliente cadastrado.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {clientesFiltrados.map(renderClienteCard)}
            </div>
          )}
        </div>

        {showAddForm && renderModal('Adicionar Cliente', formData, handleSubmit, () => setShowAddForm(false))}
        
        {editingCliente && renderModal('Editar Cliente', editingCliente, () => handleEdit(editingCliente), () => setEditingCliente(null))}
      </div>
    </Layout>
  );
} 