import { StatCardProps } from '../types/dashboard.types';

export const StatCard = ({ title, value, trend, color }: StatCardProps) => (
  <div className="bg-[#e5e7eb]/50 p-5 rounded-xl border border-gray-200">
    <p className="text-xs text-gray-400 font-semibold mb-1">{title}</p>
    <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    <div className="flex items-center gap-2 mt-2">
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
        color === 'green' ? 'text-emerald-600 bg-emerald-100' : 'text-rose-600 bg-rose-100'
      }`}>
        {trend}
      </span>
      <span className="text-[10px] text-gray-400 font-medium italic">Desde el mes pasado</span>
    </div>
  </div>
);