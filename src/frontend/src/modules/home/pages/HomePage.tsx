import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { IconArrowRight, IconLeaf, IconUsers, IconCalendar, IconMap } from '@tabler/icons-react';
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
import { PAGE_VARIANTS, FADE_UP_ITEM, STAGGER_CONTAINER, HOVER_LIFT, SCALE_IN } from '@/constants/animations';

export const HomePage: React.FC = () => {
  // Get preview data (first 3 items from each)
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);
  const upcomingEvents = MOCK_EVENTS.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
  const latestNews = MOCK_NEWS.slice(0, 3);

  return (
    <motion.div 
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
            alt="Hero Background" 
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div variants={FADE_UP_ITEM}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <IconLeaf size={16} />
              <span>Iniciativa Comunitaria</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            variants={FADE_UP_ITEM}
          >
            {STRINGS.HERO_TITLE}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white/90"
            variants={FADE_UP_ITEM}
          >
            {STRINGS.HERO_SUBTITLE}
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={FADE_UP_ITEM}
          >
            <Link href={ROUTES.NOSOTROS}>
              <Button size="lg" className="text-lg px-8 h-14">
                {STRINGS.CTA_PRIMARY}
              </Button>
            </Link>
            <Link href={ROUTES.PROYECTOS}>
              <Button variant="outline" size="lg" className="text-lg px-8 h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50">
                {STRINGS.CTA_SECONDARY}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={STAGGER_CONTAINER}
        >
          <Link href={ROUTES.MAPA}>
            <motion.div variants={FADE_UP_ITEM} whileHover={HOVER_LIFT} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors text-primary">
                  <IconMap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">Mapeo de Áreas</h3>
                <p className="text-text-muted mb-6">Identificamos y catalogamos las zonas de alto valor ecológico para su protección prioritaria.</p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  Ver mapa <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>

          <Link href={ROUTES.EVENTOS}>
            <motion.div variants={FADE_UP_ITEM} whileHover={HOVER_LIFT} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors text-text-main">
                  <IconUsers size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">Voluntariado</h3>
                <p className="text-text-muted mb-6">Únete a nuestras jornadas de limpieza y reforestación. Tu ayuda es fundamental.</p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  Ver eventos <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>

          <Link href={ROUTES.NOTICIAS}>
            <motion.div variants={FADE_UP_ITEM} whileHover={HOVER_LIFT} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors text-green-700">
                  <IconLeaf size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">Educación Ambiental</h3>
                <p className="text-text-muted mb-6">Talleres y charlas para concientizar sobre la importancia de nuestra flora y fauna nativa.</p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  Leer noticias <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Proyectos Destacados</h2>
            <p className="text-text-muted">Conoce nuestras iniciativas activas</p>
          </div>
          <Link href={ROUTES.PROYECTOS}>
            <Button variant="outline" className="hidden sm:flex group">
              Ver todos <IconArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={STAGGER_CONTAINER}
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={SCALE_IN} whileHover={HOVER_LIFT}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.PROYECTOS}>
            <Button variant="outline" className="w-full">
              Ver todos los proyectos
            </Button>
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Próximos Eventos</h2>
            <p className="text-text-muted">Únete a nuestras actividades</p>
          </div>
          <Link href={ROUTES.EVENTOS}>
            <Button variant="outline" className="hidden sm:flex group">
              Ver todos <IconArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
        
        {upcomingEvents.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={STAGGER_CONTAINER}
          >
            {upcomingEvents.map((event) => (
              <motion.div key={event.id} variants={SCALE_IN} whileHover={HOVER_LIFT}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={FADE_UP_ITEM}
            className="text-center py-12"
          >
            <Card className="max-w-md mx-auto p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <IconCalendar size={32} className="text-text-main" />
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">
                No hay eventos próximos
              </h3>
              <p className="text-text-muted mb-6">
                Estamos planificando nuevas actividades. Vuelve pronto para ver las próximas jornadas.
              </p>
              <Link href={ROUTES.EVENTOS}>
                <Button variant="outline" size="sm">
                  Ver eventos pasados
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}
        
        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.EVENTOS}>
            <Button variant="outline" className="w-full">
              Ver todos los eventos
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">Últimas Noticias</h2>
            <p className="text-text-muted">Mantente informado sobre nuestras actividades</p>
          </div>
          <Link href={ROUTES.NOTICIAS}>
            <Button variant="outline" className="hidden sm:flex group">
              Ver todas <IconArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={STAGGER_CONTAINER}
        >
          {latestNews.map((article) => (
            <motion.div key={article.id} variants={SCALE_IN} whileHover={HOVER_LIFT}>
              <NewsCard article={article} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.NOTICIAS}>
            <Button variant="outline" className="w-full">
              Ver todas las noticias
            </Button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};
