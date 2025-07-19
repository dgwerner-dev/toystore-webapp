import { ApiResponse, ClienteForm, EstatisticasResponse } from '@/types';
import { agruparVendasPorDia, normalizarCliente } from '@/utils/normalize';

import { config } from '../../config.example';

const API_BASE_URL = config.apiBaseUrl;

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
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await this.request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async getClientes(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/clientes');
  }

  async getEstatisticas(): Promise<EstatisticasResponse> {
    try {
      const response = await this.request<ApiResponse>('/clientes');
      
      // Normalizar clientes
      const clientesNormalizados = response.data.clientes.map(normalizarCliente);
      
      // Agrupar vendas por dia
      const vendasPorDia = agruparVendasPorDia(clientesNormalizados);
      
      return {
        vendasPorDia,
        clientes: clientesNormalizados,
      };
    } catch (error) {
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
    await this.request('/clientes', {
      method: 'POST',
      body: JSON.stringify(cliente),
    });
  }
}

export const apiService = new ApiService(); 