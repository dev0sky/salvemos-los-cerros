import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendar, IconArrowRight } from "@tabler/icons-react";
import { useLocation } from "wouter";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Lightbox } from "./Lightbox";
import { ROUTES } from "@/constants/routes";
import type { NewsArticle, GalleryImage } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
}

const CATEGORY_VARIANTS = {
  conservation: "success",
  events: "primary",
  education: "warning",
  community: "info",
  achievements: "success",
} as const;

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryImage: GalleryImage = {
    id: article.id,
    title: article.title,
    description: article.excerpt,
    imageUrl: article.image || "",
    category: "nature",
    date: article.date,
    tags: [article.category],
  };

  const handleCardClick = () => {
    navigate(ROUTES.NOTICIA_DETALLE.replace(":id", article.id));
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxOpen(true);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(ROUTES.NOTICIA_DETALLE.replace(":id", article.id));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="h-full"
      >
        <Card 
          className="overflow-hidden h-full flex flex-col cursor-pointer" 
          onClick={handleCardClick}
        >
          {article.image && (
            <div
              className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden group/image"
              onClick={handleImageClick}
            >
              <motion.img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <Badge variant={CATEGORY_VARIANTS[article.category] || "primary"}>
                {t(`news_card.categories.${article.category}`)}
              </Badge>
              {article.featured && (
                <Badge variant="primary">{t("news_card.featured")}</Badge>
              )}
            </div>

            <h3 className="text-xl font-semibold text-text-main mb-2">
              {article.title}
            </h3>

            <p className="text-text-muted text-sm mb-4 flex-1">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border-soft">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <IconCalendar size={14} />
                <span>{article.date}</span>
              </div>
              <button
                onClick={handleReadMore}
                className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap"
              >
                {t("news_card.read_more")} <IconArrowRight size={14} />
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      {lightboxOpen &&
        article.image &&
        createPortal(
          <AnimatePresence>
            <Lightbox
              images={[galleryImage]}
              currentIndex={0}
              onClose={() => setLightboxOpen(false)}
            />
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
