// Configurações da aplicação
export const config = {
  // URL base da API
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
  
  // Credenciais de demonstração
  demoCredentials: {
    email: process.env.NEXT_PUBLIC_DEMO_EMAIL || 'admin@toystore.com',
    password: process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'admin123',
  },
  
  // Configurações de desenvolvimento
  isDevelopment: process.env.NODE_ENV === 'development',
}; 