import { z } from 'zod';

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string().min(3, "El nombre es muy corto"),
  email: z.string().email("Email inválido"),
  phone: z.string().nullable(),
  isReferral: z.boolean().default(false),
  createdAt: z.string().or(z.date()),

});

export const CreateClientSchema = ClientSchema.omit({ id: true, createdAt: true });

export type Client = z.infer<typeof ClientSchema>;
export type CreateClientInput = z.infer<typeof CreateClientSchema>;