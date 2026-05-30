'use client';
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Globe, 
  Server, 
  ShoppingCart, 
  HelpCircle, 
  ChevronDown,
  ChevronRight, 
  Users,
  Wallet 
} from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { 
    icon: Users, 
    label: 'Gestión comercial', 
    href: '#',
    subItems: [
      { label: 'Clientes', href: '/clientes' },
      { label: 'Transacciones', href: '/transacciones' }
    ] 
  },
 
  { 
    icon: Globe, 
    label: 'Páginas webs', 
    href: '#',
    subItems: [
      { label: 'Páginas', href: '/paginasweb' },  
      { label: 'Administrador', href: '/admin' },
      { label: 'Recursos humanos', href: '/hr' }
    ] 
  },
  { icon: Server, label: 'Servidores', href: '#' },
  { icon: ShoppingCart, label: 'Tienda', href: '#' },
  { icon: HelpCircle, label: 'Centro de ayuda', href: '#' },
];

export const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<string[]>(['Clientes']); 

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => 
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#0a1f7a] rounded flex items-center justify-center text-white font-bold">LVL</div>
        <span className="font-bold text-[#0a1f7a] text-xl tracking-tight">LVL CONSULTING</span>
      </div>

      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Menu Principal
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.label}>
            <button
              onClick={() => item.subItems && toggleMenu(item.label)}
              className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                item.label === 'Dashboard' ? 'text-[#0a1f7a] bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>
              {item.subItems && (
                openMenus.includes(item.label) ? <ChevronDown size={16}/> : <ChevronRight size={16}/>
              )}
            </button>

            {item.subItems && openMenus.includes(item.label) && (
              <div className="ml-9 mt-1 space-y-1">
                {item.subItems.map((sub) => (
                  <Link
                    key={sub.label} 
                    href={sub.href}  
                    className="block px-4 py-2 text-sm rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    {sub.label} 
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};