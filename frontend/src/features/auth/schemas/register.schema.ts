import { z } from 'zod';



export const registerSchema = z.object({
  email: z.string().email('Email no válido'),
  name: z.string().min(2, 'El nombre es muy corto'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  roleId: z.number().default(2),
});


export type RegisterFormValues = z.infer<typeof registerSchema>;