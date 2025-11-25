import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { STRINGS } from '@/constants/strings';
import { ArrowRight, Leaf, Map, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 flex flex-col items-center text-center gap-6 border-b border-border-soft">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Leaf size={16} />
          <span>Iniciativa Comunitaria</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl text-text-main tracking-tight">
          {STRINGS.HERO_TITLE}
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
          {STRINGS.HERO_SUBTITLE}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button size="lg" className="h-12 px-8 text-base">
            {STRINGS.CTA_PRIMARY}
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base">
            {STRINGS.CTA_SECONDARY}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Map size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-main">Mapeo de Áreas</h3>
            <p className="text-text-muted">
              Identificamos y catalogamos las zonas de alto valor ecológico para su protección prioritaria.
            </p>
            <div className="pt-2">
              <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Ver mapa <ArrowRight size={14} />
              </a>
            </div>
          </Card>

          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 text-text-main">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-main">Voluntariado</h3>
            <p className="text-text-muted">
              Únete a nuestras jornadas de limpieza y reforestación. Tu ayuda es fundamental.
            </p>
            <div className="pt-2">
              <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Participar <ArrowRight size={14} />
              </a>
            </div>
          </Card>

          <Card className="hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4 text-green-700">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-semibold text-text-main">Educación Ambiental</h3>
            <p className="text-text-muted">
              Talleres y charlas para concientizar sobre la importancia de nuestra flora y fauna nativa.
            </p>
            <div className="pt-2">
              <a href="#" className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Aprender más <ArrowRight size={14} />
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};
