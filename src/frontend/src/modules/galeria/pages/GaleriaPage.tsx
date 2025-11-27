import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconFilter, IconPhoto, IconCalendar } from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Lightbox } from "@/components/Lightbox";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useGallery } from "@/hooks/useData";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  SCALE_IN,
  HOVER_LIFT,
} from "@/constants/animations";
import { GalleryImage } from "@/types";

export const GaleriaPage: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | GalleryImage["category"]>("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const { data: gallery = [], isLoading, error } = useGallery();

  const filteredImages = gallery.filter(
    (image) => filter === "all" || image.category === filter
  );

  const filters = [
    { value: "all" as const, label: t("filters.all") },
    { value: "project" as const, label: t("galeria_page.filters.projects") },
    { value: "event" as const, label: t("galeria_page.filters.events") },
    { value: "nature" as const, label: t("galeria_page.filters.nature") },
    { value: "team" as const, label: t("galeria_page.filters.team") },
  ];

  const handleImageClick = (image: GalleryImage) => {
    const index = filteredImages.findIndex((img) => img.id === image.id);
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {t("common.error")}
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-surface"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-surface to-accent-green/5 border-b border-border-soft">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <motion.div
            variants={FADE_UP_ITEM}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-4">
              {t("galeria_page.title")}
            </h1>
            <p className="text-text-muted text-lg md:text-xl">
              {t("galeria_page.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-0 z-30 bg-surface/95 backdrop-blur-md border-b border-border-soft shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            className="flex items-center gap-3 flex-wrap justify-center"
            variants={FADE_UP_ITEM}
          >
            <IconFilter size={20} className="text-text-muted" />
            <span className="text-sm font-medium text-text-muted">
              {t("galeria_page.filter_label")}
            </span>
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "primary" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className="transition-all duration-300"
              >
                {f.label}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery - Masonry Layout */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {filteredImages.length > 0 ? (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  variants={SCALE_IN}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={HOVER_LIFT}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 break-inside-avoid mb-4 md:mb-6"
                  onClick={() => handleImageClick(image)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    <Badge className="self-start mb-3 bg-primary/90 backdrop-blur-sm text-white border-none shadow-lg">
                      {filters.find((f) => f.value === image.category)?.label}
                    </Badge>

                    <h3 className="text-white font-bold text-base md:text-xl mb-2 line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>

                    <p className="text-white/90 text-xs md:text-sm mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                      {image.description}
                    </p>

                    <div className="flex items-center gap-2 md:gap-3 text-white/80 text-xs flex-wrap opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100">
                      <span className="flex items-center gap-1">
                        <IconCalendar size={12} />
                        {image.date}
                      </span>
                      {image.photographer && (
                        <span className="flex items-center gap-1">
                          <IconPhoto size={12} />
                          {image.photographer}
                        </span>
                      )}
                    </div>

                    {image.tags && image.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-2 flex-wrap opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-150">
                        {image.tags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <IconPhoto size={16} className="text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="max-w-md mx-auto">
              <IconPhoto
                size={64}
                className="mx-auto text-text-muted/30 mb-4"
              />
              <p className="text-text-muted text-lg">
                {t("galeria_page.no_images")}
              </p>
            </div>
          </motion.div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Lightbox
            images={filteredImages}
            currentIndex={selectedImageIndex}
            onClose={handleCloseLightbox}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
