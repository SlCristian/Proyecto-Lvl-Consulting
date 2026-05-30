import { apiClient } from '@/lib/api-client';
import { TransactionSchema, type Transaction } from '../schemas/transactionSchema';
import { z } from 'zod';

export const transactionService = {
  getAll: async (): Promise<Transaction[]> => {
    const { data } = await apiClient.get('/transactions');
    return z.array(TransactionSchema).parse(data);
  },

  create: async (transactionData: unknown): Promise<Transaction> => {
    const { data } = await apiClient.post('/transactions', transactionData);
    return TransactionSchema.parse(data);
  }
};