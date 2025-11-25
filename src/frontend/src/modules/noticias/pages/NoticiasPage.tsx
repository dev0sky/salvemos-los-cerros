import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFilter, IconNews } from '@tabler/icons-react';
import { NewsCard } from '@/components/NewsCard';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { STRINGS } from '@/constants/strings';
import { useAppStore } from '@/stores/useAppStore';
import { useNews } from '@/hooks/useData';
import { PAGE_VARIANTS, FADE_UP_ITEM, SCALE_IN, HOVER_LIFT } from '@/constants/animations';

import { ErrorState } from '@/components/ui/ErrorState';

export const NoticiasPage: React.FC = () => {
  const { newsCategory, setNewsCategory } = useAppStore();

  const { data: news = [], isLoading, error, refetch } = useNews();

  const filteredNews = news.filter(article => 
    newsCategory === 'all' || article.category === newsCategory
  );

  const featuredArticle = news.find(article => article.featured);

  const filters = [
    { value: 'all' as const, label: STRINGS.FILTER_ALL },
    { value: 'conservation' as const, label: STRINGS.CATEGORY_CONSERVATION },
    { value: 'events' as const, label: STRINGS.CATEGORY_EVENTS },
    { value: 'education' as const, label: STRINGS.CATEGORY_EDUCATION },
  ];

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <IconNews size={16} />
              <span>Últimas Noticias</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {STRINGS.NOTICIAS_TITLE}
            </h1>
            <p className="text-text-muted text-lg">
              {STRINGS.NOTICIAS_SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && newsCategory === 'all' && !isLoading && !error && (
        <section className="container mx-auto px-4">
          <motion.div
            variants={SCALE_IN}
            className="max-w-4xl mx-auto"
            whileHover={HOVER_LIFT}
          >
            <NewsCard article={featuredArticle} />
          </motion.div>
        </section>
      )}

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <motion.div 
          className="flex items-center gap-3 flex-wrap"
          variants={FADE_UP_ITEM}
        >
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Filtrar por categoría:</span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={newsCategory === filter.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setNewsCategory(filter.value)}
              className="transition-all duration-300"
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>
      </section>

      {/* News Grid */}
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
            <AnimatePresence mode='popLayout'>
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
            <p className="text-text-muted">No hay noticias en esta categoría.</p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
