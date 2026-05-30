'use client';
import React, { useEffect, useState } from 'react';
import { transactionService } from '../services/transactionService';
import { Transaction } from '../schemas/transactionSchema';
import { TransactionCard } from './TransactionCard';
import { Plus } from 'lucide-react';

export const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionService.getAll()
      .then(setTransactions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 animate-pulse text-gray-400">Cargando movimientos... uu</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0a1f7a]">Movimientos de Caja</h2>
        <button className="bg-[#0a1f7a] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform">
          <Plus size={18} />
          Registrar Transacción
        </button>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {transactions.map((t) => (
          <TransactionCard key={t.id} transaction={t} />
        ))}
        
        {transactions.length === 0 && (
          <p className="col-span-full text-center py-20 text-gray-400 italic">No hay transacciones registradas aún </p>
        )}
      </div>
    </div>
  );
};