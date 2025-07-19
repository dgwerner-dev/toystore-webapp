'use client';

import { AlertTriangle } from 'lucide-react';

export function DemoWarning() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Modo de Demonstração:</strong> A API não está disponível. 
            Os dados exibidos são apenas para demonstração da funcionalidade da aplicação.
          </p>
        </div>
      </div>
    </div>
  );
} 