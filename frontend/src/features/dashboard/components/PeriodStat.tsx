import React from 'react';
import { PeriodStatProps } from '../types/dashboard.types';

export const PeriodStat = ({ label, value, percent }: PeriodStatProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-800 leading-tight">
        {percent}
      </p>
      <p className="text-[10px] text-gray-500 font-medium">
        S/ {value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
      </p>
    </div>
  );
};