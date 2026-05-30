import { apiClient } from '@/lib/api-client';
import { Client, CreateClientInput, ClientSchema } from '../schemas/clientSchema';
import { z } from 'zod';

export const clientService = {
  getAll: async (): Promise<Client[]> => {
    const { data } = await apiClient.get('/clients');
    return z.array(ClientSchema).parse(data);
  },

  getOne: async (id: string): Promise<Client> => {
    const { data } = await apiClient.get(`/clients/${id}`);
    return ClientSchema.parse(data);
  },

  create: async (client: CreateClientInput): Promise<Client> => {
    const { data } = await apiClient.post('/clients', client);
    return ClientSchema.parse(data);
  },

  update: async (id: string, client: Partial<CreateClientInput>): Promise<Client> => {
    const { data } = await apiClient.patch(`/clients/${id}`, client);
    return ClientSchema.parse(data);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  }
};