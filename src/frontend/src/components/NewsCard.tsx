import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IconCalendar, IconArrowRight } from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { NewsArticle } from "@/types";

interface NewsCardProps {
  article: NewsArticle;
}

const CATEGORY_VARIANTS = {
  conservation: "success",
  events: "primary",
  education: "warning",
} as const;

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {article.image && (
          <div className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <Badge variant={CATEGORY_VARIANTS[article.category]}>
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
            <a
              href="#"
              className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap"
            >
              {t("news_card.read_more")} <IconArrowRight size={14} />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
