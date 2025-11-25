import React from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconArrowRight } from '@tabler/icons-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  category: 'conservation' | 'events' | 'education';
  date: string;
  author?: string;
  image?: string;
  featured?: boolean;
}

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const categoryVariants = {
    conservation: 'success',
    events: 'primary',
    education: 'warning',
  } as const;

  const categoryLabels = {
    conservation: 'Conservación',
    events: 'Eventos',
    education: 'Educación',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {article.image && (
          <div className="w-full h-48 bg-secondary/10 -m-6 mb-4">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant={categoryVariants[article.category]}>
            {categoryLabels[article.category]}
          </Badge>
          {article.featured && <Badge variant="primary">Destacado</Badge>}
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
          <a 
            href="#" 
            className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
          >
            Leer más <IconArrowRight size={14} />
          </a>
        </div>
      </Card>
    </motion.div>
  );
};
