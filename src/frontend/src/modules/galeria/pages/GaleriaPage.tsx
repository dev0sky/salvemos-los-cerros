import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFilter, IconPhoto } from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Lightbox } from '@/components/Lightbox';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { STRINGS } from '@/constants/strings';
import { useGallery } from '@/hooks/useData';
import { PAGE_VARIANTS, FADE_UP_ITEM, SCALE_IN, HOVER_LIFT } from '@/constants/animations';
import { GalleryImage } from '@/types';

export const GaleriaPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | GalleryImage['category']>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const { data: gallery = [], isLoading, error } = useGallery();

  const filteredImages = gallery.filter(image => 
    filter === 'all' || image.category === filter
  );

  const filters = [
    { value: 'all' as const, label: STRINGS.FILTER_ALL },
    { value: 'project' as const, label: 'Proyectos' },
    { value: 'event' as const, label: 'Eventos' },
    { value: 'nature' as const, label: 'Naturaleza' },
    { value: 'team' as const, label: 'Equipo' },
  ];

  const handleImageClick = (image: GalleryImage) => {
    // Find the index of the clicked image within the currently filtered images
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error al cargar galería.
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 border-b border-border-soft">
        <div className="container mx-auto">
          <motion.div
            variants={FADE_UP_ITEM}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {STRINGS.GALERIA_TITLE}
            </h1>
            <p className="text-text-muted text-lg">
              {STRINGS.GALERIA_SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="flex items-center gap-3 flex-wrap"
          variants={FADE_UP_ITEM}
        >
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Filtrar por:</span>
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(f.value)}
              className="transition-all duration-300"
            >
              {f.label}
            </Button>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          layout
        >
          <AnimatePresence mode='popLayout'>
            {filteredImages.map((image) => (
              <motion.div 
                key={image.id} 
                variants={SCALE_IN}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                whileHover={HOVER_LIFT}
                className="break-inside-avoid"
                onClick={() => handleImageClick(image)}
              >
                <div className="relative group cursor-pointer overflow-hidden rounded-2xl">
                  <img 
                    src={image.imageUrl} 
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2 bg-primary text-white border-none">
                      {filters.find(f => f.value === image.category)?.label}
                    </Badge>
                    <h3 className="text-white font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{image.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-white/60 text-xs">
                      <IconPhoto size={14} />
                      <span>{image.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filteredImages.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-muted">No hay imágenes con este filtro.</p>
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Lightbox
            images={filteredImages} // Use filtered images for navigation context
            currentIndex={selectedImageIndex}
            onClose={handleCloseLightbox}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
