import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFilter, IconPhoto } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Lightbox } from '@/components/Lightbox';
import { MOCK_GALLERY } from '@/data/gallery';
import type { GalleryImage } from '@/types';

type CategoryFilter = 'all' | GalleryImage['category'];

export const GaleriaPage: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = MOCK_GALLERY.filter(
    image => categoryFilter === 'all' || image.category === categoryFilter
  );

  const filters = [
    { value: 'all' as const, label: 'Todas' },
    { value: 'project' as const, label: 'Proyectos' },
    { value: 'event' as const, label: 'Eventos' },
    { value: 'nature' as const, label: 'Naturaleza' },
    { value: 'team' as const, label: 'Equipo' },
  ];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <IconPhoto size={16} />
              <span>Galería de Imágenes</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              Galería
            </h1>
            <p className="text-text-muted text-lg">
              Explora momentos capturados de nuestros proyectos, eventos y la belleza natural que protegemos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-3 flex-wrap">
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Filtrar por:</span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={categoryFilter === filter.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4">
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-secondary/10">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold mb-1">{image.title}</h3>
                      <p className="text-sm text-white/80">{image.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-text-muted">No hay imágenes en esta categoría.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
