import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Configuração para fazer proxy das requisições da API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
