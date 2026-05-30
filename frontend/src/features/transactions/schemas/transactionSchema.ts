import { z } from 'zod';

export const TransactionTypeEnum = z.enum(['INCOME', 'EXPENSE']);

export const TransactionSchema = z.object({
  id: z.string(),
  amount: z.number(),
  type: TransactionTypeEnum,
  description: z.string().nullable().optional(),
  createdAt: z.string().or(z.date()),
  clientId: z.string().nullable().optional(),
 
  client: z.object({
    name: z.string(),
  }).nullable().optional(),
  user: z.object({
    name: z.string(),
  }).optional(),
});

export type Transaction = z.infer<typeof TransactionSchema>;