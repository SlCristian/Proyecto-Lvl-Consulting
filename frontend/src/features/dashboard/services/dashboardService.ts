import { apiClient } from '@/lib/api-client';
import { DashboardStatsSchema, type DashboardStats } from '../schemas/dashboardSchema';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await apiClient.get('/dashboard/stats');
  
    return DashboardStatsSchema.parse(data);
  }
};