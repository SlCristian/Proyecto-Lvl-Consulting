import { z } from 'zod';

export const SalesChartSchema = z.object({
  day: z.string(),
  total: z.number(),
});

export const DashboardStatsSchema = z.object({
  summary: z.object({
    totalIncome: z.number(),
    totalExpenses: z.number(),
    netProfit: z.number(),
    totalClients: z.number(),
  }),
  periodStats: z.object({
    daily: z.number(),
    weekly: z.number(),
    monthly: z.number(),
    yearly: z.number(),
  }),
  referralStats: z.object({
    count: z.number(),
    percentage: z.number(),
  }),
  salesChart: z.array(SalesChartSchema),
});

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;