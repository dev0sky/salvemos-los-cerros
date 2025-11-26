import React from "react";
import { useLocation } from "wouter";
import { ROUTES } from "../../constants/routes";

export const RegisterPage: React.FC = () => {
  const [, setLocation] = useLocation();

  // Placeholder for registration logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement registration logic here
    alert("Funcionalidad de registro en construcción");
    setLocation(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-sm border border-border-soft">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-text-main">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            O{" "}
            <a
              href={ROUTES.LOGIN}
              className="font-medium text-primary hover:text-primary/80"
            >
              inicia sesión si ya tienes cuenta
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-soft placeholder-text-muted text-text-main rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Nombre de usuario"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-soft placeholder-text-muted text-text-main focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border-soft placeholder-text-muted text-text-main rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
