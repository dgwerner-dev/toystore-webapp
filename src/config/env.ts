// Configurações de ambiente da aplicação
export const env = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3002',
  
  // Authentication
  DEMO_EMAIL: process.env.NEXT_PUBLIC_DEMO_EMAIL || 'admin@toystore.com',
  DEMO_PASSWORD: process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'admin123',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Feature flags
  ENABLE_DEMO_MODE: process.env.NEXT_PUBLIC_ENABLE_DEMO_MODE === 'true',
} as const;

// Validação de variáveis obrigatórias (desabilitada para demonstração)
// const requiredEnvVars = [
//   'NEXT_PUBLIC_API_BASE_URL',
// ] as const;

// Verificar variáveis obrigatórias apenas em produção e no servidor
// if (env.IS_PRODUCTION && typeof window === 'undefined') {
//   for (const envVar of requiredEnvVars) {
//     if (!process.env[envVar]) {
//       throw new Error(`Missing required environment variable: ${envVar}`);
//     }
//   }
// } 