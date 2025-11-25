import React from 'react';
import { motion } from 'framer-motion';
import { IconFilter, IconNews } from '@tabler/icons-react';
import { NewsCard } from '@/components/NewsCard';
import { Button } from '@/components/ui/Button';
import { STRINGS } from '@/constants/strings';
import { useAppStore } from '@/stores/useAppStore';
import { MOCK_NEWS } from '@/data/news';

export const NoticiasPage: React.FC = () => {
  const { newsCategory, setNewsCategory } = useAppStore();

  const filteredNews = MOCK_NEWS.filter(article => 
    newsCategory === 'all' || article.category === newsCategory
  );

  const featuredArticle = MOCK_NEWS.find(article => article.featured);

  const filters = [
    { value: 'all' as const, label: STRINGS.FILTER_ALL },
    { value: 'conservation' as const, label: STRINGS.CATEGORY_CONSERVATION },
    { value: 'events' as const, label: STRINGS.CATEGORY_EVENTS },
    { value: 'education' as const, label: STRINGS.CATEGORY_EDUCATION },
  ];

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
      {featuredArticle && newsCategory === 'all' && (
        <section className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            <NewsCard article={featuredArticle} />
          </motion.div>
        </section>
      )}

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-3 flex-wrap">
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Filtrar por categoría:</span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={newsCategory === filter.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setNewsCategory(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* News Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No hay noticias en esta categoría.</p>
          </div>
        )}
      </section>
    </div>
  );
};
