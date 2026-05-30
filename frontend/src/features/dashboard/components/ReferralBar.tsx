import { ReferralBarProps } from '../types/dashboard.types';

export const ReferralBar = ({ label, value, total, color }: ReferralBarProps) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <div>
          <p className="text-sm font-bold text-gray-800">{value}</p>
          <p className="text-[10px] text-gray-400 font-semibold">{label}</p>
        </div>
        <p className="text-[10px] text-gray-400 font-bold">{percentage.toFixed(0)}%</p>
      </div>
      <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};