'use client';

import { useAuth } from '@/contexts/AuthContext';
import { BarChart3, LogOut, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      setIsLoggingOut(true);
      try {
        await logout();
      } catch (error) {
        console.error('Erro durante logout:', error);
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">ToyStore Dashboard</h1>
              </div>
              <nav className="ml-10 flex space-x-8">
                <Link
                  href="/dashboard"
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  href="/clientes"
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    isActive('/clientes')
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Clientes
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                  isLoggingOut 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-500 hover:text-red-600'
                }`}
                title="Sair do sistema"
              >
                <LogOut className={`h-4 w-4 mr-2 ${isLoggingOut ? 'animate-spin' : ''}`} />
                {isLoggingOut ? 'Saindo...' : 'Sair'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 