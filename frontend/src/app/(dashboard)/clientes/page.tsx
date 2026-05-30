import { ClientList } from "@/features/Clientes/components/ClientList";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gestión Comercial</h1>
        <p className="text-sm text-gray-500">Administra tus clientes y su procedencia.</p>
      </div>
      
      <ClientList />
    </div>
  );
}