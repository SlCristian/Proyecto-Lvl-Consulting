'use client';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Bell, LayoutGrid, Settings, Search } from 'lucide-react';

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">
   
      <div>
        <h2 className="text-xl font-bold text-gray-800">¡Te damos la bienvenida {user?.name.split(' ')[0]}!</h2>
        <p className="text-xs text-gray-500 capitalize">{today}</p>
      </div>

     
      <div className="flex items-center gap-6">
       
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <img src="https://flagcdn.com/w20/es.png" alt="ES" className="w-5" />
          <span>Español</span>
          <Settings size={16} />
        </div>

        
        <div className="flex items-center gap-4 text-gray-400">
          <LayoutGrid size={20} className="cursor-pointer hover:text-gray-600" />
          <Bell size={20} className="cursor-pointer hover:text-gray-600" />
          <Settings size={20} className="cursor-pointer hover:text-gray-600" />
        </div>

   
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">{user?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase">CEO LVL Consulting</p>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
             <img src="https://ui-avatars.com/api/?name=Miguel+Liberato&background=0D8ABC&color=fff" alt="Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
};