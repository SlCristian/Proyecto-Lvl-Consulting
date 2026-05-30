import React from 'react';
import { Transaction } from '../schemas/transactionSchema';
import { ArrowUpRight, ArrowDownLeft, Calendar, User, Tag } from 'lucide-react';

interface Props {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: Props) => {
  const isIncome = transaction.type === 'INCOME';

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {isIncome ? <ArrowUpRight size={24} /> : <ArrowDownLeft size={24} />}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {transaction.type}
        </span>
      </div>

      <div className="space-y-1 mb-4">
        <p className="text-2xl font-bold text-gray-800">
          {isIncome ? '+' : '-'} S/ {transaction.amount.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500 font-medium line-clamp-1">
          {transaction.description || 'Sin descripción'}
        </p>
      </div>

      <div className="pt-4 border-t border-gray-50 space-y-2">
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <User size={14} />
          <span>Cliente: <span className="text-gray-600 font-semibold">{transaction.client?.name || 'Gasto General'}</span></span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <Calendar size={14} />
          <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-gray-400">
          <Tag size={14} />
          <span>Registrado por: {transaction.user?.name}</span>
        </div>
      </div>
    </div>
  );
};