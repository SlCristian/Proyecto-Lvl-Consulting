'use client';
import React from 'react';
import { WebPage } from '../schemas/webPageSchema';
import { Edit2, Trash2, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface WebPageTableProps {
  pages: WebPage[];
  loading: boolean;
  onEdit: (page: WebPage) => void;
  onDelete: (id: string) => void;
}

export const WebPageTable = ({ pages, loading, onEdit, onDelete }: WebPageTableProps) => {
  if (loading) return <div className="p-20 text-center text-slate-400 animate-pulse font-black uppercase tracking-widest">Sincronizando uu...</div>;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-[0.2em] font-black border-b border-slate-100">
              <th className="px-6 py-5 font-black text-slate-700">Portada</th>
              <th className="px-6 py-5 font-black text-slate-700">Información</th>
              <th className="px-6 py-5 font-black text-slate-700">Categoría</th>
              <th className="px-6 py-5 text-right font-black text-slate-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-blue-50/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-14 h-10 rounded-xl bg-slate-100 overflow-hidden border-2 border-slate-200 shadow-sm">
                    {page.resources?.[0] ? ( <img src={page.resources[0].url} className="w-full h-full object-cover" /> ) : ( <div className="w-full h-full flex items-center justify-center bg-slate-50"><ImageIcon className="text-slate-300" size={16} /></div> )}
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                  {page.title}
                  <p className="text-[10px] text-slate-400 font-mono font-normal">/{page.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0a1f7a] text-[10px] font-black uppercase tracking-tighter">
                    {page.category?.name || 'Imágenes'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => onEdit(page)} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm"><Edit2 size={16} /></button>
                    <button onClick={() => onDelete(page.id)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex items-center justify-between px-4 py-6">
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Total: {pages.length} Registros uu</p>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all disabled:opacity-20" disabled><ChevronLeft size={18} /></button>
          {[1, 2, 3].map((num) => (
            <button key={num} className={`w-10 h-10 rounded-xl text-xs font-black transition-all ${num === 1 ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-500 hover:bg-slate-100'}`}>{num}</button>
          ))}
          <button className="p-2 rounded-xl border border-slate-200 text-slate-900 hover:bg-slate-50 transition-all shadow-sm"><ChevronRight size={18} /></button>
        </div>
      </div>
    </div>
  );
};