import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAuthStore } from "../../stores/auth";
import api from "../../lib/api";
import { ROUTES } from "../../constants/routes";

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await api.post("/token/", { username, password });
      const { access, refresh } = response.data;
      // For now, we'll just use the username as the user object since the token endpoint might not return user details
      // In a real app, you might want to fetch user details after login or decode the token
      setAuth({ username, email: "" }, access, refresh);
      setLocation(ROUTES.HOME);
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-md w-full space-y-8 bg-card p-8 rounded-2xl shadow-sm border border-border-soft">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-text-main">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            O{" "}
            <a
              href={ROUTES.REGISTER}
              className="font-medium text-primary hover:text-primary/80"
            >
              regístrate si aún no tienes cuenta
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
