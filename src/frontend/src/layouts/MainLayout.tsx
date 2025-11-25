import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IconMenu2, IconX, IconLeaf } from '@tabler/icons-react';
import { ROUTES } from '../constants/routes';
import { LanguageSelector } from '../components/LanguageSelector';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();


  const navLinks = [
    { label: t('nav.home'), path: ROUTES.HOME },
    { label: t('nav.projects'), path: ROUTES.PROYECTOS },
    { label: t('nav.about'), path: ROUTES.NOSOTROS },
    { label: t('nav.events'), path: ROUTES.EVENTOS },
    { label: t('nav.news'), path: ROUTES.NOTICIAS },
    { label: t('nav.gallery'), path: ROUTES.GALERIA },
    { label: t('nav.map'), path: ROUTES.MAPA },
    { label: t('nav.hills'), path: ROUTES.CERROS },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={ROUTES.HOME}>
            <a className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <IconLeaf className="text-primary" size={20} />
              </div>
              <span className="text-xl font-bold text-text-main">{t('app_title')}</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a 
                  className={`text-sm font-medium transition-colors relative ${
                    isActive(link.path) 
                      ? 'text-primary' 
                      : 'text-text-muted hover:text-primary'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </Link>
            ))}
            <div className="pl-4 border-l border-border-soft">
              <LanguageSelector />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 md:hidden">
            <LanguageSelector />
            <button
              className="p-2 text-text-main"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border-soft bg-surface"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.path} href={link.path}>
                    <a
                      className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? 'bg-primary text-white'
                          : 'text-text-muted hover:bg-primary/10 hover:text-primary'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border-soft bg-card py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} {t('app_title')}. {t('footer_text')}</p>
        </div>
      </footer>
    </div>
  );
};
