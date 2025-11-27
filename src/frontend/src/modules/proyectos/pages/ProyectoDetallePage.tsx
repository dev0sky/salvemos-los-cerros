import React from "react";
import { useParams, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconArrowLeft,
  IconCheck,
  IconTarget,
  IconTrophy,
  IconCoin,
} from "@tabler/icons-react";
import { useProjects, useNews, useEvents } from "@/hooks/useData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  RelatedItemsSlider,
  RelatedItem,
} from "@/components/RelatedItemsSlider";
import { PAGE_VARIANTS, FADE_UP_ITEM } from "@/constants/animations";

const STATUS_VARIANTS = {
  active: "primary",
  completed: "success",
  planned: "warning",
  paused: "default",
} as const;

export const ProyectoDetallePage: React.FC = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const { data: projects = [], isLoading: isLoadingProjects } = useProjects();
  const { data: news = [], isLoading: isLoadingNews } = useNews();
  const { data: events = [], isLoading: isLoadingEvents } = useEvents();

  const isLoading = isLoadingProjects || isLoadingNews || isLoadingEvents;

  const project = projects.find((p) => String(p.id) === id);

  const relatedProjects: RelatedItem[] = projects
    .filter((p) => p.id !== project?.id && p.status === project?.status)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      images: p.image ? [p.image, ...(p.gallery_images || [])] : [],
      link: `/proyectos/${p.id}`,
      date: p.startDate,
      category: p.status,
    }));

  const latestNews: RelatedItem[] = news.slice(0, 5).map((n) => ({
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">
          {t("project_detail.not_found")}
        </h1>
        <Button onClick={() => navigate("/proyectos")}>
          {t("project_detail.back_to_projects")}
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
          onClick={() => navigate("/proyectos")}
          className="flex items-center gap-2"
        >
          <IconArrowLeft size={16} />
          {t("project_detail.back")}
        </Button>
      </div>

      {/* Hero Section with Image */}
      {project.image && (
        <section className="relative h-96 md:h-[30rem] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30" />
          <motion.div
            className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 container mx-auto"
            variants={FADE_UP_ITEM}
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={STATUS_VARIANTS[project.status]}>
                {t(`project_card.status.${project.status}`)}
              </Badge>
              <span className="text-white/90 text-sm">
                {project.progress}% {t("project_detail.completed")}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <IconMapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <IconCalendar size={16} />
                <span>
                  {new Date(project.startDate).toLocaleDateString(undefined, {
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
            </div>
          </motion.div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-text-main mb-4">
                {t("project_detail.description")}
              </h2>
              <p className="text-text-muted leading-relaxed whitespace-pre-line">
                {project.content || project.description}
              </p>
            </Card>

            {/* Objectives */}
            {project.objectives && project.objectives.length > 0 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <IconTarget size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">
                    {t("project_detail.objectives")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IconCheck
                        size={20}
                        className="text-primary flex-shrink-0 mt-1"
                      />
                      <span className="text-text-muted">{objective}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent-green/10 rounded-full text-accent-green">
                    <IconTrophy size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">
                    {t("project_detail.achievements")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IconCheck
                        size={20}
                        className="text-accent-green flex-shrink-0 mt-1"
                      />
                      <span className="text-text-muted">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Gallery */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-text-main mb-6">
                  {t("project_detail.gallery")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery_images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${project.title} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-4">
                {t("project_detail.progress")}
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-muted">
                      {t("project_detail.completion")}
                    </span>
                    <span className="font-bold text-primary">
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-border-soft rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
                {project.endDate && (
                  <div className="pt-4 border-t border-border-soft">
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                      <IconCalendar size={16} />
                      <span>
                        {t("project_detail.end_date")}:{" "}
                        {new Date(project.endDate).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            timeZone: "America/Chihuahua",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Budget */}
            {project.budgetRequested && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                    <IconCoin size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {t("project_detail.budget")}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">
                      {t("project_detail.requested")}
                    </span>
                    <span className="font-bold">
                      ${project.budgetRequested.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">
                      {t("project_detail.raised")}
                    </span>
                    <span className="font-bold text-primary">
                      ${(project.budgetRaised || 0).toLocaleString()}
                    </span>
                  </div>
                  {project.budgetProgress !== undefined && (
                    <div className="pt-2">
                      <div className="w-full bg-border-soft rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-accent-green rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(project.budgetProgress, 100)}%`,
                          }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Partners */}
            {project.partners && project.partners.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <IconUsers size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {t("project_detail.partners")}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {project.partners.map((partner, index) => (
                    <li
                      key={index}
                      className="text-sm text-text-muted flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Team Members */}
            {project.teamMembers && project.teamMembers.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent-green/10 rounded-full text-accent-green">
                    <IconUsers size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {t("project_detail.team")}
                  </h3>
                </div>
                <p className="text-sm text-text-muted">
                  {project.teamMembers.length}{" "}
                  {t("project_detail.team_members")}
                </p>
              </Card>
            )}

            {/* Related Projects Slider */}
            {relatedProjects.length > 0 && (
              <RelatedItemsSlider
                title={
                  t("project_detail.related_projects") ||
                  "Proyectos Relacionados"
                }
                items={relatedProjects}
              />
            )}

            {/* Latest News Slider */}
            {latestNews.length > 0 && (
              <RelatedItemsSlider
                title={t("project_detail.latest_news") || "Últimas Noticias"}
                items={latestNews}
              />
            )}

            {/* Related Events Slider */}
            {relatedEvents.length > 0 && (
              <RelatedItemsSlider
                title={
                  t("project_detail.related_events") || "Eventos de Interés"
                }
                items={relatedEvents}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
