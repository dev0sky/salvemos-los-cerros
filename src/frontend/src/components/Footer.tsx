import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import { Link } from "wouter";
import { ROUTES } from "../constants/routes";
import api from "../lib/api";
import { toast } from "sonner";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferences, setPreferences] = useState({
    news: true,
    events: true,
    projects: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !phone) {
      toast.error("Por favor ingresa un correo o teléfono");
      return;
    }
    setLoading(true);
    try {
      await api.post("/subscribers/", {
        email,
        phone,
        receive_news: preferences.news,
        receive_events: preferences.events,
        receive_projects: preferences.projects,
      });
      toast.success("¡Gracias por suscribirte!");
      setEmail("");
      setPhone("");
    } catch (error) {
      console.error(error);
      toast.error("Error al suscribirse. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-card border-t border-border-soft pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Social */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-main">
              {t("app_title")}
            </h3>
            <p className="text-sm text-text-muted">
              Protegiendo nuestros cerros y áreas naturales para las futuras
              generaciones.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
              >
                <IconBrandFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
              >
                <IconBrandTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-text-muted hover:text-primary transition-colors"
              >
                <IconBrandInstagram size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-main">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <Link
                  href={ROUTES.HOME}
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.NOSOTROS}
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.PROYECTOS}
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.EVENTOS}
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.events")}
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.FAQ}
                  className="hover:text-primary transition-colors"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  href={ROUTES.CONTRIBUCIONES}
                  className="hover:text-primary transition-colors"
                >
                  Contribuciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-main">Contacto</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li className="flex items-center gap-2">
                <IconMail size={16} />
                <span>contacto@salvemosloscerros.org</span>
              </li>
              <li className="flex items-center gap-2">
                <IconPhone size={16} />
                <span>+52 614 123 4567</span>
              </li>
            </ul>
          </div>

          {/* Subscription Form */}
          <div className="space-y-4">
            <h4 className="font-semibold text-text-main">Mantente Informado</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-3 py-2 rounded-lg border border-border-soft bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Teléfono (opcional)"
                className="w-full px-3 py-2 rounded-lg border border-border-soft bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <div className="space-y-2">
                <p className="text-xs text-text-muted font-medium">
                  Me interesa recibir:
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.news}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          news: e.target.checked,
                        })
                      }
                      className="rounded text-primary focus:ring-primary"
                    />
                    Noticias
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.events}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          events: e.target.checked,
                        })
                      }
                      className="rounded text-primary focus:ring-primary"
                    />
                    Eventos
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.projects}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          projects: e.target.checked,
                        })
                      }
                      className="rounded text-primary focus:ring-primary"
                    />
                    Proyectos
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Suscribiendo..." : "Suscribirse"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-border-soft pt-8 text-center text-sm text-text-muted">
          <p>
            &copy; {new Date().getFullYear()} {t("app_title")}. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
