'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { WebPageTable } from './WebPageTable';
import { WebPageModal } from './WebPageModal';
import { webPageService } from '../services/webPageService';
import { WebPage, CreateWebPageInput } from '../schemas/webPageSchema';
import { Plus, Globe } from 'lucide-react';

export const WebPagesContainer = () => {
  const [pages, setPages] = useState<WebPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<WebPage | null>(null);

  
  const fetchPages = useCallback(async () => {
    try {
      const data = await webPageService.getAll();
      setPages(data);
    } catch (error) {
      console.error("Error al cargar páginas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

useEffect(() => {
  let isMounted = true;

  const loadData = async () => {

    if (isMounted) {
      await fetchPages();
    }
  };

  loadData();

  return () => {
    isMounted = false;
  };
}, [fetchPages]);


  const handleSubmit = async (data: CreateWebPageInput) => {
    try {
      setLoading(true);
      if (selectedPage) {
        // Si hay seleccionada, actualizamos por ID
        await webPageService.update(selectedPage.id, data);
      } else {
        // Si no, creamos nueva
        await webPageService.create(data);
      }
      await fetchPages();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar:", error);
      setLoading(false);
    }
  };

  // 3. Lógica para Eliminar
  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer uu")) {
      try {
        setLoading(true);
        await webPageService.delete(id);
        await fetchPages();
      } catch (error) {
        console.error("Error al eliminar:", error);
        setLoading(false);
      }
    }
  };

  // 4. Control de Modal
  const handleOpenCreate = () => {
    setSelectedPage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (page: WebPage) => {
    setSelectedPage(page);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPage(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="text-[#0a1f7a]" size={24} />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Catálogo de Páginas Web</h1>
          </div>
          <p className="text-sm text-slate-500 font-medium italic">Gestiona los proyectos y recursos visuales uu</p>
        </div>

        <button 
          onClick={handleOpenCreate}
          className="bg-[#0a1f7a] text-white px-6 py-3 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-900 transition-all active:scale-95 shadow-xl shadow-blue-100"
        >
          <Plus size={20} />
          NUEVA PÁGINA
        </button>
      </div>

  
      <WebPageTable 
        pages={pages} 
        loading={loading} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <WebPageModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedPage}
      />
    </div>
  );
};