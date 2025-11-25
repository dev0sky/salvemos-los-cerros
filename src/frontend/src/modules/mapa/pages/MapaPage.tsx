import React from 'react';
import { motion } from 'framer-motion';
import { MapComponent } from '@/components/Map/MapComponent';
import { CERROS } from '@/data/cerros';

export const MapaPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-16 border-b border-border-soft">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              Mapa de Cerros
            </h1>
            <p className="text-text-muted text-lg">
              Explora la ubicación de los cerros emblemáticos de Chihuahua y conoce su importancia ecológica.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4 h-[600px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="h-full"
        >
          <MapComponent 
            cerros={CERROS} 
            height="100%" 
            zoom={12}
          />
        </motion.div>
      </section>
    </div>
  );
};
