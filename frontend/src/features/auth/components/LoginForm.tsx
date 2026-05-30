'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { loginSchema, LoginFormValues } from '../schemas/login.schema';
import { authService } from '../services/auth.service';
import Cookies from 'js-cookie'; 
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await authService.login(data);
      setAuth(response.user, response.token);
      Cookies.set('auth-token', response.token, { expires: 1 });
      router.push('/dashboard');
    } catch (error: unknown) {
  
  if (axios.isAxiosError(error)) {
   
    const errorMessage = error.response?.data?.message || "Error en el servidor uu";
    alert(errorMessage);
  } else {
   
    alert("Ocurrió un error inesperado uu");
  }
  };
  }
  
  return (
    <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-lg mx-auto border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#0a1f7a] mb-2">Iniciar Sesión</h2>
        <p className="text-gray-500 text-sm">Bienvenido de nuevo a LVL Consulting</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 italic">Correo electrónico*</label>
          <input
            {...register('email')}
            type="email"
            placeholder="email@ejemplo.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none text-black"
          />
          {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 italic">Contraseña*</label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Introducir la contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 outline-none text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0a1f7a] hover:bg-[#07165a] text-white font-bold py-3 rounded-lg transition-all shadow-md active:scale-[0.98] disabled:bg-gray-400"
        >
          {isSubmitting ? 'Cargando...' : 'Entrar al Sistema'}
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta? <span className="text-blue-800 font-bold cursor-pointer hover:underline">Regístrate aquí</span>
          </p>
        </div>
      </form>
    </div>
  );
};