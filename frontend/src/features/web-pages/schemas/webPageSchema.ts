import { z } from 'zod';


export const ResourceSchema = z.object({
  id: z.string().optional(),
  url: z.string().url("URL de imagen inválida"),
  publicId: z.string(),
  format: z.string(),
  type: z.string(),
 
  webPageId: z.string().optional(), 
}).passthrough();

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});



export const WebPageSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
  description: z.string().min(10, "La descripción es muy corta"),
  slug: z.string().min(3, "Slug inválido"),
  categoryId: z.number(),
  category: CategorySchema.optional(), 
  resources: z.array(ResourceSchema).optional(), 
  createdAt: z.string().or(z.date()),
});


export const CreateWebPageSchema = WebPageSchema.omit({ 
  id: true, 
  createdAt: true,
  category: true 
});


export type WebPage = z.infer<typeof WebPageSchema>;


export type CreateWebPageInput = z.infer<typeof CreateWebPageSchema>;

export type Resource = z.infer<typeof ResourceSchema>;