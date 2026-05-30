import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/tu-imagen-de-fondo.jpg')" }} 
    >
      <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full px-4">
        <LoginForm />
      </div>
    </main>
  );
}