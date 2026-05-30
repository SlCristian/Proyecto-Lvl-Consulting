'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Image as ImageIcon, Loader2, Trash2, UploadCloud } from 'lucide-react';
import { 
  WebPage, 
  CreateWebPageInput, 
  CreateWebPageSchema 
} from '../schemas/webPageSchema';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWebPageInput) => void;
  initialData?: WebPage | null;
}

export const WebPageModal = ({ isOpen, onClose, onSubmit, initialData }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm<CreateWebPageInput>({
    resolver: zodResolver(CreateWebPageSchema),
  });

  const currentResources = watch('resources') || [];

  
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          description: initialData.description,
          slug: initialData.slug,
          categoryId: initialData.categoryId,
          resources: initialData.resources || [],
        });
      } else {
        reset({ title: '', description: '', slug: '', categoryId: 1, resources: [] });
      }
    }
  }, [initialData, isOpen, reset]);

  const handleFiles = async (files: FileList | File[]) => {
    const file = files[0];
    if (!file) return;
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'lvl_consulting_present'); 
      const res = await fetch(`https://api.cloudinary.com/v1_1/dxjclugeu/image/upload`, { method: 'POST', body: formData });
      const data = await res.json();
      const newResource = { url: data.secure_url, publicId: data.public_id, format: data.format, type: data.resource_type };
      setValue('resources', [...currentResources, newResource]);
    } catch (e) { console.error(e); } finally { setUploading(false); setIsDragging(false); }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{initialData ? 'Editar Página' : 'Registrar Página'}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900"><X size={24} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Título</label>
              <input {...register('title')} className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 text-slate-900 font-bold bg-slate-50/50 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Slug</label>
              <input {...register('slug')} className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 text-slate-900 font-mono bg-slate-50/50 outline-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Categoría</label>
            <select {...register('categoryId', { valueAsNumber: true })} className="w-full p-4 rounded-2xl border-2 border-slate-100 text-slate-900 font-black bg-white appearance-none outline-none cursor-pointer">
              <option value={1}>Imágenes</option>
              <option value={2}>Documentos</option>
              <option value={3}>Videos</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Descripción</label>
            <textarea {...register('description')} rows={3} className="w-full p-4 rounded-2xl border-2 border-slate-100 text-slate-900 font-medium bg-slate-50/50 outline-none" />
          </div>
          <div className="space-y-4">
             <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Galería</label>
             <div className="grid grid-cols-3 gap-4">
                {currentResources.map((res, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-slate-100 shadow-md group">
                    <img src={res.url} className="w-full h-full object-cover" alt="" />
                    <button type="button" onClick={() => setValue('resources', currentResources.filter((_, idx) => idx !== i))} className="absolute inset-0 bg-rose-600/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white"><Trash2 size={20} /></button>
                  </div>
                ))}
                <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }} className={`relative aspect-square rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${isDragging ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-slate-50'}`}>
                  {uploading ? <Loader2 className="animate-spin text-blue-600" /> : <><UploadCloud className="text-blue-600 mb-1" /><span className="text-[10px] font-black uppercase text-slate-800">Subir</span><input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFiles(e.target.files!)} accept="image/*" /></>}
                </div>
             </div>
          </div>
          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Cancelar</button>
            <button type="submit" disabled={isSubmitting || uploading} className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-blue-700 shadow-xl transition-all uppercase tracking-widest">{isSubmitting ? 'Guardando...' : 'Publicar Ahora'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};