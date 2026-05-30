'use client';

import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';


import { dashboardService } from '../services/dashboardService';
import { DashboardStats } from '../schemas/dashboardSchema';


import { StatCard } from './StatCard';
import { ReferralBar } from './ReferralBar';
import { PeriodStat } from './PeriodStat';

export const DashboardContainer = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Error cargando el dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 animate-pulse font-medium">Cargando dashboard maestro... uu</p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* 1. SECCIÓN DE CARDS - Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Ingresos" 
          value={`S/ ${stats.summary.totalIncome.toLocaleString()}`} 
          trend="+ S/50k" 
          color="green" 
        />
        <StatCard 
          title="Número de clientes" 
          value={stats.summary.totalClients} 
          trend="-30 clientes" 
          color="red" 
        />
        <StatCard 
          title="Inversión realizada" 
          value={`S/ ${stats.summary.totalExpenses.toLocaleString()}`} 
          trend="+ S/32k" 
          color="green" 
        />
        <StatCard 
          title="Relación de ganancia" 
          value={`S/ ${stats.summary.netProfit.toLocaleString()}`} 
          trend="- S/50k" 
          color="red" 
        />
      </div>


      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-bold text-[#0a1f7a] mb-6 uppercase tracking-wider">Historial de ventas</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stats.salesChart}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#9ca3af', fontSize: 12}} 
                dy={10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                stroke="#10b981" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Widget: Distribución por Periodos */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 flex items-center gap-6">
          <div className="w-1/2 h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Referidos', value: stats.referralStats.count },
                    { name: 'Directos', value: stats.summary.totalClients - stats.referralStats.count }
                  ]}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#1e293b" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-1/2 grid grid-cols-2 gap-y-4 gap-x-2">
            <PeriodStat label="Anual" value={stats.periodStats.yearly} percent="100%" />
            <PeriodStat label="Mensual" value={stats.periodStats.monthly} percent="60%" />
            <PeriodStat label="Semanal" value={stats.periodStats.weekly} percent="20%" />
            <PeriodStat label="Diario" value={stats.periodStats.daily} percent="30%" />
          </div>
        </div>
        
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
           <h3 className="text-sm font-bold text-[#0a1f7a] uppercase tracking-wider">Análisis de Clientes</h3>
           <div className="space-y-6">
             <ReferralBar 
                label="Referidos" 
                value={stats.referralStats.count} 
                total={stats.summary.totalClients} 
                color="bg-emerald-500" 
             />
             <ReferralBar 
                label="Clientes Directos" 
                value={stats.summary.totalClients - stats.referralStats.count} 
                total={stats.summary.totalClients} 
                color="bg-slate-700" 
             />
           </div>
        </div>

      </div>
    </div>
  );
};