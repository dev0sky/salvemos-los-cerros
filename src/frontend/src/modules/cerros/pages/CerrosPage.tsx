import React from 'react';
import { motion } from 'framer-motion';
import { CerroCard } from '@/components/CerroCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCerros } from '@/hooks/useData';

export const CerrosPage: React.FC = () => {
  const { data: cerros = [], isLoading, error } = useCerros();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error al cargar cerros.
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 border-b border-border-soft">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              Nuestros Cerros
            </h1>
            <p className="text-text-muted text-lg">
              Conoce los guardianes naturales de nuestra ciudad. Cada cerro es un ecosistema único que debemos proteger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cerros.map((cerro, index) => (
            <motion.div
              key={cerro.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <CerroCard cerro={cerro} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
