import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  IconMenu2,
  IconX,
  IconLeaf,
  IconChevronDown,
} from "@tabler/icons-react";
import { ROUTES } from "../constants/routes";
import { LanguageSelector } from "../components/LanguageSelector";
import { useAuthStore } from "../stores/auth";
import { Footer } from "../components/Footer";

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const { user, logout, isAuthenticated } = useAuthStore();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks: NavItem[] = [
    { label: t("nav.home"), path: ROUTES.HOME },
    {
      label: "Explorar",
      children: [
        { label: t("nav.hills"), path: ROUTES.CERROS },
        { label: t("nav.map"), path: ROUTES.MAPA },
        { label: t("nav.gallery"), path: ROUTES.GALERIA },
      ],
    },
    {
      label: "Participa",
      children: [
        { label: t("nav.projects"), path: ROUTES.PROYECTOS },
        { label: t("nav.events"), path: ROUTES.EVENTOS },
        { label: "Voluntariado", path: ROUTES.VOLUNTARIADO },
      ],
    },
    { label: t("nav.news"), path: ROUTES.NOTICIAS },
    { label: t("nav.about"), path: ROUTES.NOSOTROS },
  ];

  const isActive = (path: string) => location === path;

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-50 w-full border-b border-border-soft bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <IconLeaf className="text-primary" size={20} />
            </div>
            <span className="text-xl font-bold text-text-main">
              {t("app_title")}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      activeDropdown === link.label
                        ? "text-primary"
                        : "text-text-muted hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <IconChevronDown size={16} />
                  </button>
                ) : (
                  <Link
                    href={link.path!}
                    className={`text-sm font-medium transition-colors relative ${
                      isActive(link.path!)
                        ? "text-primary"
                        : "text-text-muted hover:text-primary"
                    }`}
                  >
                    {link.label}
                    {isActive(link.path!) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-primary"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-48 py-2 bg-card rounded-xl shadow-lg border border-border-soft"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path!}
                            className="block px-4 py-2 text-sm text-text-muted hover:bg-primary/10 hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Auth Links */}
            <div className="flex items-center gap-4 pl-4 border-l border-border-soft">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-text-main">
                    {user?.username}
                  </span>
                  <button
                    onClick={() => logout()}
                    className="text-sm font-medium text-text-muted hover:text-primary"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href={ROUTES.LOGIN}
                    className="text-sm font-medium text-text-muted hover:text-primary"
                  >
                    Ingresar
                  </Link>
                  <Link
                    href={ROUTES.REGISTER}
                    className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-xl hover:opacity-90"
                  >
                    Registro
                  </Link>
                </div>
              )}
            </div>
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
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border-soft bg-surface"
            >
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-sm font-medium text-text-muted">
                          {link.label}
                        </div>
                        <div className="pl-4 space-y-1 border-l-2 border-border-soft ml-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.path}
                              href={child.path!}
                              className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                                isActive(child.path!)
                                  ? "bg-primary text-white"
                                  : "text-text-muted hover:bg-primary/10 hover:text-primary"
                              }`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.path!}
                        className={`block px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          isActive(link.path!)
                            ? "bg-primary text-white"
                            : "text-text-muted hover:bg-primary/10 hover:text-primary"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4 mt-4 border-t border-border-soft space-y-2">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-text-muted hover:bg-primary/10 hover:text-primary rounded-xl"
                    >
                      Cerrar Sesión
                    </button>
                  ) : (
                    <>
                      <Link
                        href={ROUTES.LOGIN}
                        className="block px-4 py-2 text-sm font-medium text-text-muted hover:bg-primary/10 hover:text-primary rounded-xl"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Ingresar
                      </Link>
                      <Link
                        href={ROUTES.REGISTER}
                        className="block px-4 py-2 text-sm font-medium bg-primary text-white rounded-xl hover:opacity-90 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Registrarse
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};
