import { API_BASE_URL } from '@/config/env';
import { ApiResponse, ClienteForm, EstatisticasResponse } from '@/types';
import { agruparVendasPorDia, normalizarCliente } from '@/utils/normalize';

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
      localStorage.removeItem('user_data');
      localStorage.removeItem('last_login');
      sessionStorage.clear();
    }
  }

  async logout(): Promise<void> {
    try {
      const token = this.getToken();
      if (token) {
        // Endpoint para invalidar token no servidor (futuro)
        // await this.request('/api/auth/logout', { method: 'POST' });
      }
    } catch (error) {
      console.warn('Erro ao invalidar token no servidor:', error);
    } finally {
      this.clearToken();
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
      throw new Error(`Erro na API: ${response.status}`);
    }

    return response.json();
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const response = await this.request<{ token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async getClientes(): Promise<ApiResponse> {
    return this.request<ApiResponse>('/api/clientes');
  }

  async getEstatisticas(): Promise<EstatisticasResponse> {
    try {
      const response = await this.request<ApiResponse>('/api/clientes');
      const clientesNormalizados = response.data.clientes.map(normalizarCliente);
      const vendasPorDia = agruparVendasPorDia(clientesNormalizados);
      
      return {
        vendasPorDia,
        clientes: clientesNormalizados,
      };
    } catch {
      console.warn('API não disponível, usando dados de demonstração');
      
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

  async editarCliente(id: string, cliente: ClienteForm): Promise<void> {
    await this.request(`/api/clientes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
    });
  }

  async excluirCliente(id: string): Promise<void> {
    await this.request(`/api/clientes/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(); 