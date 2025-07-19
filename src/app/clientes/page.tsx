'use client';

import { ClienteForm } from '@/components/ClienteForm';
import { ClientesList } from '@/components/ClientesList';
import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { Cliente } from '@/types';
import { Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientesPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Proteção de rota
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await apiService.getClientes();
      const clientesNormalizados = response.data.clientes.map(clienteAPI => ({
        id: Math.random().toString(36).substr(2, 9),
        nome: clienteAPI.info.nomeCompleto,
        email: clienteAPI.info.detalhes.email,
        nascimento: clienteAPI.info.detalhes.nascimento,
        vendas: clienteAPI.estatisticas.vendas.map((venda, index) => ({
          id: Math.random().toString(36).substr(2, 9),
          clienteId: Math.random().toString(36).substr(2, 9),
          valor: venda.valor,
          data: venda.data,
        })),
      }));
      setClientes(clientesNormalizados);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      setError('Erro ao carregar clientes. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchClientes();
    }
  }, [isAuthenticated]);

  const handleClienteAdded = () => {
    setShowForm(false);
    fetchClientes();
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Redirecionar se não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Carregando clientes...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchClientes}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestão de Clientes
            </h2>
            <p className="text-gray-600">
              Visualize e gerencie todos os clientes cadastrados
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </button>
        </div>

        {/* Lista de clientes */}
        <ClientesList clientes={clientes} />

        {/* Modal de formulário */}
        {showForm && (
          <ClienteForm
            onSuccess={handleClienteAdded}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </Layout>
  );
} 