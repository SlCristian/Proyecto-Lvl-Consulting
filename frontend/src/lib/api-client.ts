import axios from 'axios';


export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.request.use((config) => {

  const authData = localStorage.getItem('auth-storage');
  
  if (authData) {
    try {
      
      const parsed = JSON.parse(authData);
      const token = parsed.state?.token;

      if (token) {
      
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al leer el token del storage", error);
    }
  }
  
  return config;
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem('auth-storage');
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);