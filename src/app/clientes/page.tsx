import { Layout } from '@/components/Layout';

export default function ClientesPage() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestão de Clientes
            </h2>
            <p className="text-gray-600">
              Visualize e gerencie todos os clientes cadastrados
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lista de Clientes</h3>
          <p className="text-gray-600">Página de clientes funcionando corretamente!</p>
          <p className="text-gray-600 mt-2">Agora você pode clicar em "Clientes" na navegação e a página carrega.</p>
        </div>
      </div>
    </Layout>
  );
} 