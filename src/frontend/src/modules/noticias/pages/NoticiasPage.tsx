import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconFilter, IconNews } from "@tabler/icons-react";
import { NewsCard } from "@/components/NewsCard";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAppStore } from "@/stores/useAppStore";
import { useNews } from "@/hooks/useData";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  SCALE_IN,
  HOVER_LIFT,
} from "@/constants/animations";
import { ErrorState } from "@/components/ui/ErrorState";

/**
 * Página de noticias inspirada en el diseño de Google News.
 * - Barra superior con logo y filtros de categoría.
 * - Artículo destacado con imagen de fondo y superposición de texto.
 * - Cuadrícula de tarjetas responsiva.
 */
export const NoticiasPage: React.FC = () => {
  const { t } = useTranslation();
  const { newsCategory, setNewsCategory } = useAppStore();
  const { data: news = [], isLoading, error, refetch } = useNews();

  const filteredNews = news.filter(
    (article) => newsCategory === "all" || article.category === newsCategory
  );

  const featuredArticle = news.find((article) => article.featured);

  const filters = [
    { value: "all" as const, label: t("filters.all") },
    { value: "conservation" as const, label: t("categories.conservation") },
    { value: "events" as const, label: t("categories.events") },
    { value: "education" as const, label: t("categories.education") },
  ];

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Header con logo y filtros */}
      <header className="bg-surface border-b border-border-soft py-4 md:py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <IconNews size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-text-main">
              {t("noticias_page.title")}
            </h1>
          </div>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <IconFilter size={20} className="text-text-muted" />
            <span className="text-sm font-medium text-text-muted">
              {t("noticias_page.filter_label")}
            </span>
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={newsCategory === filter.value ? "primary" : "outline"}
                size="sm"
                onClick={() => setNewsCategory(filter.value)}
                className="transition-all duration-300"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </header>

      {/* Artículo destacado al estilo Google News */}
      {featuredArticle && newsCategory === "all" && !isLoading && !error && (
        <section className="relative h-96 md:h-[30rem] overflow-hidden rounded-2xl shadow-lg">
          <img
            src={featuredArticle.image || "https://picsum.photos/1200/600"}
            alt={featuredArticle.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30" />
          <motion.div
            className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12"
            variants={FADE_UP_ITEM}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {featuredArticle.title}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              {featuredArticle.excerpt}
            </p>
            <Button
              variant="primary"
              className="mt-4 self-start"
              onClick={() => {}} // Placeholder action
            >
              {t("noticias_page.read_more")}
            </Button>
          </motion.div>
        </section>
      )}

      {/* Grid de noticias */}
      <section className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : filteredNews.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredNews.map((article) => (
                <motion.div
                  key={article.id}
                  variants={SCALE_IN}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  whileHover={HOVER_LIFT}
                >
                  <NewsCard article={article} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-text-muted">{t("noticias_page.no_news")}</p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
