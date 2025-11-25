import React from 'react';
import { Outlet } from 'react-router-dom';
import { STRINGS } from '../constants/strings';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">NV</span>
            </div>
            <span className="text-xl font-bold text-text-main">{STRINGS.APP_TITLE}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Inicio</a>
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Proyectos</a>
            <a href="#" className="text-sm font-medium text-text-muted hover:text-primary transition-colors">Nosotros</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border-soft bg-card py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} {STRINGS.APP_TITLE}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
