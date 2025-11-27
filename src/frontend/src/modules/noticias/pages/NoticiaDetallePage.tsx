import React from "react";
import { useParams, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  IconCalendar,
  IconArrowLeft,
  IconUser,
  IconEye,
  IconTag,
  IconExternalLink,
} from "@tabler/icons-react";
import { useNews, useEvents, useProjects } from "@/hooks/useData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  RelatedItemsSlider,
  RelatedItem,
} from "@/components/RelatedItemsSlider";
import { CommentsSection } from "@/components/CommentsSection";
import { PAGE_VARIANTS, FADE_UP_ITEM } from "@/constants/animations";

const CATEGORY_VARIANTS = {
  conservation: "success",
  events: "primary",
  education: "warning",
  community: "default",
  achievements: "success",
} as const;

export const NoticiaDetallePage: React.FC = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const { data: news = [], isLoading: isLoadingNews } = useNews();
  const { data: events = [], isLoading: isLoadingEvents } = useEvents();
  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();

  const isLoading = isLoadingNews || isLoadingEvents || isLoadingProjects;

  const article = news.find((n) => String(n.id) === id);

  const relatedNews: RelatedItem[] = news
    .filter((n) => n.id !== article?.id && n.category === article?.category)
    .slice(0, 5)
    .map((n) => ({
      id: n.id,
      title: n.title,
      description: n.excerpt,
      images: n.image ? [n.image, ...(n.galleryImages || [])] : [],
      link: `/noticias/${n.id}`,
      date: n.date,
      category: n.category,
    }));

  const relatedEvents: RelatedItem[] = events.slice(0, 5).map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    images: e.image ? [e.image, ...(e.gallery_images || [])] : [],
    link: `/eventos/${e.id}`,
    date: e.startDatetime,
    category: e.category,
  }));

  const relatedProjects: RelatedItem[] = projects.slice(0, 5).map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    images: p.image ? [p.image, ...(p.gallery_images || [])] : [],
    link: `/proyectos/${p.id}`,
    date: p.startDate,
    category: p.status,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">
          {t("news_detail.not_found")}
        </h1>
        <Button onClick={() => navigate("/noticias")}>
          {t("news_detail.back_to_news")}
        </Button>
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
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/noticias")}
          className="flex items-center gap-2"
        >
          <IconArrowLeft size={16} />
          {t("news_detail.back")}
        </Button>
      </div>

      {/* Hero Section with Image */}
      {article.image && (
        <section className="relative h-96 md:h-[30rem] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30" />
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2">
            {/* Article Header */}
            <motion.div variants={FADE_UP_ITEM} className="mb-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge variant={CATEGORY_VARIANTS[article.category]}>
                  {t(`news_card.categories.${article.category}`)}
                </Badge>
                {article.featured && (
                  <Badge variant="primary">{t("news_card.featured")}</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-text-main mb-6">
                {article.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-text-muted text-sm">
                {article.author && (
                  <div className="flex items-center gap-2">
                    <IconUser size={16} />
                    <span>{article.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <IconCalendar size={16} />
                  <span>
                    {new Date(article.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/Chihuahua",
                      timeZoneName: "short",
                    })}
                  </span>
                </div>
                {article.views !== undefined && (
                  <div className="flex items-center gap-2">
                    <IconEye size={16} />
                    <span>
                      {article.views} {t("news_detail.views")}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Article Content */}
            <Card className="p-8 md:p-12 mb-8">
              {/* Excerpt */}
              <div className="mb-8 pb-8 border-b border-border-soft">
                <p className="text-xl text-text-main font-medium leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              {/* Main Content with Markdown */}
              <div className="markdown-content">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ node, ...props }: any) => (
                      <h1
                        className="text-3xl font-bold text-text-main mb-4 mt-8 first:mt-0"
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }: any) => (
                      <h2
                        className="text-2xl font-bold text-text-main mb-3 mt-6"
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }: any) => (
                      <h3
                        className="text-xl font-semibold text-text-main mb-2 mt-4"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }: any) => (
                      <p
                        className="text-text-muted leading-relaxed mb-4"
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }: any) => (
                      <ul
                        className="list-disc list-inside text-text-muted mb-4 space-y-2 ml-4"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }: any) => (
                      <ol
                        className="list-decimal list-inside text-text-muted mb-4 space-y-2 ml-4"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }: any) => (
                      <li
                        className="text-text-muted leading-relaxed"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }: any) => (
                      <strong className="font-bold text-text-main" {...props} />
                    ),
                    a: ({ node, ...props }: any) => (
                      <a
                        className="text-primary hover:underline font-medium"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }: any) => (
                      <blockquote
                        className="border-l-4 border-primary pl-4 italic text-text-muted my-4"
                        {...props}
                      />
                    ),
                    code: ({ node, inline, ...props }: any) =>
                      inline ? (
                        <code
                          className="bg-secondary/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono"
                          {...props}
                        />
                      ) : (
                        <code
                          className="block bg-secondary/10 text-text-main p-4 rounded-lg text-sm font-mono overflow-x-auto my-4"
                          {...props}
                        />
                      ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {article.tags && article.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border-soft">
                  <div className="flex items-center gap-3 mb-4">
                    <IconTag size={20} className="text-text-muted" />
                    <h3 className="text-lg font-bold text-text-main">
                      {t("news_detail.tags")}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <Badge key={index} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Gallery */}
            {article.galleryImages && article.galleryImages.length > 0 && (
              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold text-text-main mb-6">
                  {t("news_detail.gallery")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {article.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${article.title} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* External Links */}
            {article.externalLinks && article.externalLinks.length > 0 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <IconExternalLink size={20} className="text-primary" />
                  <h3 className="text-lg font-bold text-text-main">
                    {t("news_detail.external_links")}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {article.externalLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2 text-sm"
                      >
                        <IconExternalLink size={16} />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            {/* Comments Section */}
            <CommentsSection type="news" id={id || ""} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Related News Slider */}
            {relatedNews.length > 0 && (
              <RelatedItemsSlider
                title={t("news_detail.related_news") || "Noticias Relacionadas"}
                items={relatedNews}
              />
            )}

            {/* Related Events Slider */}
            {relatedEvents.length > 0 && (
              <RelatedItemsSlider
                title={t("news_detail.related_events") || "Eventos de Interés"}
                items={relatedEvents}
              />
            )}

            {/* Related Projects Slider */}
            {relatedProjects.length > 0 && (
              <RelatedItemsSlider
                title={
                  t("news_detail.related_projects") || "Proyectos Destacados"
                }
                items={relatedProjects}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
