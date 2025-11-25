import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProjectCard } from '@/components/ProjectCard';
import { EventCard } from '@/components/EventCard';
import { NewsCard } from '@/components/NewsCard';
import { STRINGS } from '@/constants/strings';
import { ROUTES } from '@/constants/routes';
import { MOCK_PROJECTS } from '@/data/projects';
import { MOCK_EVENTS } from '@/data/events';
import { MOCK_NEWS } from '@/data/news';
import { ArrowRight, Leaf, Map, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  // Get preview data (first 3 items from each)
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
  const latestNews = MOCK_NEWS.slice(0, 3);

  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 flex flex-col items-center text-center gap-6 border-b border-border-soft">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          <Leaf size={16} />
          <span>Iniciativa Comunitaria</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold max-w-3xl text-text-main tracking-tight"
        >
          {STRINGS.HERO_TITLE}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {STRINGS.HERO_SUBTITLE}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-4 justify-center mt-4"
        >
          <Button size="lg" className="h-12 px-8 text-base">
            {STRINGS.CTA_PRIMARY}
          </Button>
          <Link href={ROUTES.NOSOTROS}>
            <a>
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                {STRINGS.CTA_SECONDARY}
              </Button>
            </a>
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                <Map size={24} />
              </div>
              <h3 className="text-xl font-semibold text-text-main">Mapeo de Áreas</h3>
              <p className="text-text-muted">
                Identificamos y catalogamos las zonas de alto valor ecológico para su protección prioritaria.
              </p>
              <div className="pt-2">
                <Link href={ROUTES.PROYECTOS}>
                  <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Ver proyectos <ArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-text-main">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-semibold text-text-main">Voluntariado</h3>
              <p className="text-text-muted">
                Únete a nuestras jornadas de limpieza y reforestación. Tu ayuda es fundamental.
              </p>
              <div className="pt-2">
                <Link href={ROUTES.EVENTOS}>
                  <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Ver eventos <ArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-700">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-semibold text-text-main">Educación Ambiental</h3>
              <p className="text-text-muted">
                Talleres y charlas para concientizar sobre la importancia de nuestra flora y fauna nativa.
              </p>
              <div className="pt-2">
                <Link href={ROUTES.NOTICIAS}>
                  <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Leer noticias <ArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Proyectos Destacados</h2>
            <p className="text-text-muted">Conoce nuestras iniciativas activas</p>
          </div>
          <Link href={ROUTES.PROYECTOS}>
            <a>
              <Button variant="outline">
                Ver todos <ArrowRight size={16} className="ml-2" />
              </Button>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Próximos Eventos</h2>
            <p className="text-text-muted">Únete a nuestras actividades</p>
          </div>
          <Link href={ROUTES.EVENTOS}>
            <a>
              <Button variant="outline">
                Ver todos <ArrowRight size={16} className="ml-2" />
              </Button>
            </a>
          </Link>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Card className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">
                No hay eventos próximos
              </h3>
              <p className="text-text-muted mb-4">
                Estamos planificando nuevas actividades. Vuelve pronto para ver las próximas jornadas.
              </p>
              <Link href={ROUTES.EVENTOS}>
                <a>
                  <Button variant="outline" size="sm">
                    Ver eventos pasados
                  </Button>
                </a>
              </Link>
            </Card>
          </motion.div>
        )}
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Últimas Noticias</h2>
            <p className="text-text-muted">Mantente informado sobre nuestras actividades</p>
          </div>
          <Link href={ROUTES.NOTICIAS}>
            <a>
              <Button variant="outline">
                Ver todas <ArrowRight size={16} className="ml-2" />
              </Button>
            </a>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};
