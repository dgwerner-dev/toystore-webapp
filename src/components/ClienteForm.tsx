'use client';

import { apiService } from '@/services/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const clienteSchema = z.object({
  nomeCompleto: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
});

type ClienteFormData = z.infer<typeof clienteSchema>;

interface ClienteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ClienteForm({ onSuccess, onCancel }: ClienteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
  });

  const onSubmit = async (data: ClienteFormData) => {
    try {
      setIsSubmitting(true);
      setError('');
      await apiService.adicionarCliente(data);
      reset();
      onSuccess();
    } catch {
      setError('Erro ao adicionar cliente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">
              Adicionar Cliente
            </h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              {...register('nomeCompleto')}
              type="text"
              id="nomeCompleto"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nomeCompleto ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Digite o nome completo"
            />
            {errors.nomeCompleto && (
              <p className="mt-1 text-sm text-red-600">{errors.nomeCompleto.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Digite o email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="nascimento" className="block text-sm font-medium text-gray-700 mb-1">
              Data de Nascimento
            </label>
            <input
              {...register('nascimento')}
              type="date"
              id="nascimento"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nascimento ? 'border-red-300' : 'border-gray-300'
              }`}
            />
            {errors.nascimento && (
              <p className="mt-1 text-sm text-red-600">{errors.nascimento.message}</p>
            )}
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adicionando...' : 'Adicionar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 