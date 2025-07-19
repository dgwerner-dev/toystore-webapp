import { env } from '@/config/env';
import { ApiResponse, ClienteForm, EstatisticasResponse } from '@/types';
import { agruparVendasPorDia, normalizarCliente } from '@/utils/normalize';

const API_BASE_URL = env.API_BASE_URL;

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    if (!this.token && typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('🌐 Fazendo requisição para:', url);
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log('📋 Headers:', headers);
    console.log('📋 Options:', options);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ Response data:', data);
      return data;
    } catch (error) {
      console.error('❌ Request error:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    console.log('🔍 Tentando login com:', { email, password });
    console.log('🔍 API_BASE_URL:', API_BASE_URL);
    
    try {
      const response = await this.request<{ token: string }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      console.log('✅ Login bem-sucedido:', response);
      this.setToken(response.token);
      return response;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  }

  async getClientes(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/clientes');
  }

  async getEstatisticas(): Promise<EstatisticasResponse> {
    try {
      const response = await this.request<ApiResponse>('/api/clientes');
      
      // Normalizar clientes
      const clientesNormalizados = response.data.clientes.map(normalizarCliente);
      
      // Agrupar vendas por dia
      const vendasPorDia = agruparVendasPorDia(clientesNormalizados);
      
      return {
        vendasPorDia,
        clientes: clientesNormalizados,
      };
    } catch {
      // Se a API não estiver disponível, usar dados mock para demonstração
      console.warn('API não disponível, usando dados de demonstração');
      
      // Importação dinâmica para evitar problemas de SSR
      const { mockApiResponse } = await import('@/data/mockData');
      
      const clientesNormalizados = mockApiResponse.data.clientes.map(normalizarCliente);
      const vendasPorDia = agruparVendasPorDia(clientesNormalizados);
      
      return {
        vendasPorDia,
        clientes: clientesNormalizados,
      };
    }
  }

  async adicionarCliente(cliente: ClienteForm): Promise<void> {
    await this.request('/api/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
    });
  }
}

export const apiService = new ApiService(); 