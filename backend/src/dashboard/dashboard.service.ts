import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const now = new Date();

    // Configuración de fechas para los filtros
    const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
    const startOfWeek = new Date(new Date().setDate(now.getDate() - 7));
    const startOfMonth = new Date(new Date().setMonth(now.getMonth() - 1));
    const startOfYear = new Date(new Date().setFullYear(now.getFullYear(), 0, 1));

    // Ejecutamos TODO en paralelo (Súper optimizado)
    const [
      incomeData, 
      expenseData, 
      totalClients, 
      referralClients,
      dailyIncome,
      weeklyIncome,
      monthlyIncome,
      yearlyIncome,
      salesChart // <--- Nueva data para el gráfico de líneas
    ] = await Promise.all([
      // 1. Totales Globales
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'INCOME' },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'EXPENSE' },
      }),

      // 2. Datos de Clientes
      this.prisma.client.count(),
      this.prisma.client.count({ where: { isReferral: true } }),

      // 3. Desglose de Ingresos por tiempo
      this.getSumByDate(startOfDay),
      this.getSumByDate(startOfWeek),
      this.getSumByDate(startOfMonth),
      this.getSumByDate(startOfYear),

      // 4. Lógica para el gráfico de los últimos 7 días
      this.getSalesLast7Days(startOfWeek),
    ]);

    const totalIncome = incomeData._sum.amount || 0;
    const totalExpenses = expenseData._sum.amount || 0;

    return {
      summary: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        totalClients,
      },
      periodStats: {
        daily: dailyIncome,
        weekly: weeklyIncome,
        monthly: monthlyIncome,
        yearly: yearlyIncome,
      },
      referralStats: {
        count: referralClients,
        percentage: totalClients > 0 ? (referralClients / totalClients) * 100 : 0,
      },
      salesChart, // <--- Aquí tienes las "montañitas" del gráfico
    };
  }

  // Método para sumar ingresos por fecha
  private async getSumByDate(startDate: Date) {
    const result = await this.prisma.transaction.aggregate({
      _sum: { amount: true },
      where: {
        type: 'INCOME',
        createdAt: { gte: startDate },
      },
    });
    return result._sum.amount || 0;
  }

  // Método para armar el array del gráfico de los últimos 7 días
  private async getSalesLast7Days(startDate: Date) {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        type: 'INCOME',
        createdAt: { gte: startDate },
      },
      select: {
        amount: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const chartData = days.map(day => ({ day, total: 0 }));

    transactions.forEach(t => {
      const dayName = days[t.createdAt.getDay()];
      const dayEntry = chartData.find(d => d.day === dayName);
      if (dayEntry) dayEntry.total += t.amount;
    });

    return chartData;
  }
}