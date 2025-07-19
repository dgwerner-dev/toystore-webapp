'use client';

import { ClienteForm } from '@/components/ClienteForm';
import { ClientesList } from '@/components/ClientesList';
import { ClientesStats } from '@/components/ClientesStats';
import { DemoWarning } from '@/components/DemoWarning';
import { Layout } from '@/components/Layout';
import { VendasChart } from '@/components/VendasChart';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { EstatisticasResponse } from '@/types';
import { Plus, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<EstatisticasResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Proteção de rota
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      setIsDemoMode(false);
      const estatisticas = await apiService.getEstatisticas();
      setData(estatisticas);
    } catch (err) {
      // Se a API não estiver disponível, usar dados mock
      try {
        const { mockApiResponse } = await import('@/data/mockData');
        const { normalizarCliente, agruparVendasPorDia } = await import('@/utils/normalize');
        
        const clientesNormalizados = mockApiResponse.data.clientes.map(normalizarCliente);
        const vendasPorDia = agruparVendasPorDia(clientesNormalizados);
        
        setData({
          vendasPorDia,
          clientes: clientesNormalizados,
        });
        setIsDemoMode(true);
      } catch {
        setError('Erro ao carregar dados. Verifique se a API está rodando.');
        console.error('Erro ao carregar dados:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleClienteAdded = () => {
    setShowForm(false);
    fetchData(); // Recarregar dados após adicionar cliente
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
    return null; // Será redirecionado pelo useEffect
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-gray-600">Carregando dados...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error && !isDemoMode) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
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
        {/* Aviso de modo de demonstração */}
        {isDemoMode && <DemoWarning />}

        {/* Header com botão de adicionar cliente */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Dashboard - ToyStore
            </h2>
            <p className="text-gray-600">
              Gerencie seus clientes e visualize estatísticas de vendas
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            disabled={isDemoMode}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Cliente
          </button>
        </div>

        {data && (
          <>
            {/* Estatísticas dos clientes */}
            <ClientesStats clientes={data.clientes} />

            {/* Gráfico de vendas */}
            <div className="mb-8">
              <VendasChart vendasPorDia={data.vendasPorDia} />
            </div>

            {/* Lista de clientes */}
            <div className="mb-8">
              <ClientesList clientes={data.clientes} />
            </div>
          </>
        )}

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