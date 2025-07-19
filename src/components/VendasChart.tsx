'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface VendaPorDia {
  data: string;
  total: number;
}

interface VendasChartProps {
  vendasPorDia: VendaPorDia[];
}

export function VendasChart({ vendasPorDia }: VendasChartProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Vendas por Dia
        </h3>
      </div>
      
      {vendasPorDia.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhuma venda registrada
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vendasPorDia}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="data" 
              tickFormatter={formatDate}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number) => [formatCurrency(value), 'Total']}
              labelFormatter={formatDate}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
} 