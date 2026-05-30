import { apiClient } from '@/lib/api-client';
import { 
  WebPage, 
  WebPageSchema, 
  CreateWebPageInput 
} from '../schemas/webPageSchema';
import { z } from 'zod';

export const webPageService = {
  /**
   * Obtiene todas las páginas web
   * Ruta: GET /web-pages
   */
  getAll: async (): Promise<WebPage[]> => {
    const { data } = await apiClient.get('/web-pages');
    // Validamos que lo que viene del backend sea un array de WebPages
    return z.array(WebPageSchema).parse(data);
  },

  /**
   * Obtiene una sola página por ID
   * Ruta: GET /web-pages/:id
   */
  getOne: async (id: string): Promise<WebPage> => {
    const { data } = await apiClient.get(`/web-pages/${id}`);
    return WebPageSchema.parse(data);
  },

  /**
   * Crea una nueva página web
   * Ruta: POST /web-pages
   */
  create: async (payload: CreateWebPageInput): Promise<WebPage> => {
    const { data } = await apiClient.post('/web-pages', payload);
    return WebPageSchema.parse(data);
  },


  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/web-pages/${id}`);
  },



update: async (id: string, payload: CreateWebPageInput): Promise<WebPage> => {
  const cleanPayload = {
    title: payload.title,
    description: payload.description,
    slug: payload.slug,
    categoryId: Number(payload.categoryId),
    resources: payload.resources?.map(res => ({
      url: res.url,
      publicId: res.publicId,
      format: res.format,
      type: res.type
    }))
  };

  const { data } = await apiClient.patch(`/web-pages/${id}`, cleanPayload);
  return WebPageSchema.parse(data);
}
};