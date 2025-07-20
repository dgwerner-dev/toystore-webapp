'use client';

import { Layout } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';
import { EstatisticasResponse } from '@/types';
import { calcularDestaques } from '@/utils/normalize';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<EstatisticasResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/');
      return;
    }

    if (isAuthenticated) {
      carregarDados();
    }
  }, [isAuthenticated, authLoading, router]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);
      const estatisticas = await apiService.getEstatisticas();
      setData(estatisticas);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };



  const renderGrafico = () => {
    if (!data?.vendasPorDia.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum dado de vendas disponível</p>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.vendasPorDia}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="data" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
            formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Vendas']}
          />
          <Bar dataKey="total" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Carregando dashboard...</p>
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
              onClick={carregarDados}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum dado disponível</p>
          </div>
        </div>
      </Layout>
    );
  }

  const destaques = calcularDestaques(data.clientes);

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Visão geral das vendas e clientes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-100 border border-green-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-green-800 font-semibold text-sm mb-3">Maior Volume de Vendas</h3>
            {destaques.maiorVolume?.cliente ? (
              <div>
                <p className="text-green-900 font-bold text-lg mb-1">{destaques.maiorVolume.cliente.nome}</p>
                <p className="text-green-700 font-medium">R$ {destaques.maiorVolume.totalVendas.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-green-600 text-sm">Nenhum cliente encontrado</p>
            )}
          </div>
          
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-blue-800 font-semibold text-sm mb-3">Maior Valor Médio</h3>
            {destaques.maiorMedia?.cliente ? (
              <div>
                <p className="text-blue-900 font-bold text-lg mb-1">{destaques.maiorMedia.cliente.nome}</p>
                <p className="text-blue-700 font-medium">R$ {destaques.maiorMedia.mediaValor.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-blue-600 text-sm">Nenhum cliente encontrado</p>
            )}
          </div>
          
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 shadow-sm">
            <h3 className="text-purple-800 font-semibold text-sm mb-3">Maior Frequência</h3>
            {destaques.maiorFrequencia?.cliente ? (
              <div>
                <p className="text-purple-900 font-bold text-lg mb-1">{destaques.maiorFrequencia.cliente.nome}</p>
                <p className="text-purple-700 font-medium">{destaques.maiorFrequencia.frequenciaCompras} compras</p>
              </div>
            ) : (
              <p className="text-purple-600 text-sm">Nenhum cliente encontrado</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas por Dia</h3>
          {renderGrafico()}
        </div>
      </div>
    </Layout>
  );
} 