import { apiClient } from '@/lib/api-client';
import { LoginFormValues } from '../schemas/login.schema';

export const authService = {
  login: async (data: LoginFormValues) => {
    const response = await apiClient.post('/auth/login', data);
    return response.data; 
  },
};