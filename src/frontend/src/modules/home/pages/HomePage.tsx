import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconLeaf,
  IconUsers,
  IconCalendar,
  IconMap,
  IconNews,
  IconShovel,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ProjectCard } from "@/components/ProjectCard";
import { EventCard } from "@/components/EventCard";
import { NewsCard } from "@/components/NewsCard";
import { ROUTES } from "@/constants/routes";
import { useProjects, useEvents, useNews } from "@/hooks/useData";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  STAGGER_CONTAINER,
  SCALE_IN,
} from "@/constants/animations";

import { ErrorState } from "@/components/ui/ErrorState";

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const {
    data: projects = [],
    isLoading: loadingProjects,
    error: errorProjects,
    refetch: refetchProjects,
  } = useProjects();
  const {
    data: events = [],
    isLoading: loadingEvents,
    error: errorEvents,
    refetch: refetchEvents,
  } = useEvents();
  const {
    data: news = [],
    isLoading: loadingNews,
    error: errorNews,
    refetch: refetchNews,
  } = useNews();

  // Get preview data (first 3 items from each)
  const featuredProjects = projects.slice(0, 3);
  const upcomingEvents = events
    .filter((e) => new Date(e.startDatetime) >= new Date())
    .slice(0, 3);
  const latestNews = news.slice(0, 3);

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.div variants={FADE_UP_ITEM}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
              <IconLeaf size={16} />
              <span>{t("hero.badge")}</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 tracking-tight"
            variants={FADE_UP_ITEM}
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-white/90"
            variants={FADE_UP_ITEM}
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.p
            className="text-lg mb-10 max-w-3xl mx-auto text-white/80"
            variants={FADE_UP_ITEM}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={FADE_UP_ITEM}
          >
            <Link href={ROUTES.NOSOTROS}>
              <Button size="lg" className="text-lg px-8 h-14">
                {t("hero.cta_primary")}
              </Button>
            </Link>
            <Link href={ROUTES.PROYECTOS}>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white hover:border-white/50"
              >
                {t("hero.cta_secondary")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={STAGGER_CONTAINER}
        >
          <Link href={ROUTES.MAPA}>
            <motion.div variants={FADE_UP_ITEM} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group hover:shadow-2xl duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors text-primary">
                  <IconMap size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">
                  {t("features.map.title")}
                </h3>
                <p className="text-text-muted mb-6">
                  {t("features.map.description")}
                </p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  {t("features.map.link")} <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>

          <Link href={ROUTES.EVENTOS}>
            <motion.div variants={FADE_UP_ITEM} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group hover:shadow-2xl duration-300">
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors text-text-main">
                  <IconUsers size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">
                  {t("features.volunteer.title")}
                </h3>
                <p className="text-text-muted mb-6">
                  {t("features.volunteer.description")}
                </p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  {t("features.volunteer.link")} <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>

          <Link href={ROUTES.NOTICIAS}>
            <motion.div variants={FADE_UP_ITEM} className="h-full">
              <Card className="h-full p-8 flex flex-col items-center text-center cursor-pointer hover:border-primary/50 transition-colors group hover:shadow-2xl duration-300">
                <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors text-green-700">
                  <IconLeaf size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-text-main">
                  {t("features.education.title")}
                </h3>
                <p className="text-text-muted mb-6">
                  {t("features.education.description")}
                </p>
                <span className="text-primary font-semibold flex items-center gap-2 mt-auto group-hover:gap-3 transition-all">
                  {t("features.education.link")} <IconArrowRight size={18} />
                </span>
              </Card>
            </motion.div>
          </Link>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">
              {t("sections.projects.title")}
            </h2>
            <p className="text-text-muted">{t("sections.projects.subtitle")}</p>
          </div>
          <Link href={ROUTES.PROYECTOS}>
            <Button variant="outline" className="hidden sm:flex group">
              {t("sections.projects.view_all")}{" "}
              <IconArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>

        {loadingProjects ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : errorProjects ? (
          <ErrorState onRetry={() => refetchProjects()} />
        ) : featuredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={STAGGER_CONTAINER}
          >
            {featuredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={SCALE_IN}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={FADE_UP_ITEM} className="text-center py-12">
            <Card className="max-w-md mx-auto p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <IconShovel size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">
                {t("sections.projects.empty_title")}
              </h3>
              <p className="text-text-muted mb-6">
                {t("sections.projects.empty_desc")}
              </p>
              <Link href={ROUTES.PROYECTOS}>
                <Button variant="outline" size="sm">
                  {t("sections.projects.empty_btn")}
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.PROYECTOS}>
            <Button variant="outline" className="w-full">
              {t("sections.projects.empty_btn")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">
              {t("sections.events.title")}
            </h2>
            <p className="text-text-muted">{t("sections.events.subtitle")}</p>
          </div>
          <Link href={ROUTES.EVENTOS}>
            <Button variant="outline" className="hidden sm:flex group">
              {t("sections.events.view_all")}{" "}
              <IconArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>

        {loadingEvents ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : errorEvents ? (
          <ErrorState onRetry={() => refetchEvents()} />
        ) : upcomingEvents.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={STAGGER_CONTAINER}
          >
            {upcomingEvents.map((event) => (
              <motion.div key={event.id} variants={SCALE_IN} className="h-full">
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={FADE_UP_ITEM} className="text-center py-12">
            <Card className="max-w-md mx-auto p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <IconCalendar size={32} className="text-text-main" />
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">
                {t("sections.events.empty_title")}
              </h3>
              <p className="text-text-muted mb-6">
                {t("sections.events.empty_desc")}
              </p>
              <Link href={ROUTES.EVENTOS}>
                <Button variant="outline" size="sm">
                  {t("sections.events.empty_btn")}
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.EVENTOS}>
            <Button variant="outline" className="w-full">
              {t("sections.events.empty_btn")}
            </Button>
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={FADE_UP_ITEM}
        >
          <div>
            <h2 className="text-3xl font-bold text-text-main mb-2">
              {t("sections.news.title")}
            </h2>
            <p className="text-text-muted">{t("sections.news.subtitle")}</p>
          </div>
          <Link href={ROUTES.NOTICIAS}>
            <Button variant="outline" className="hidden sm:flex group">
              {t("sections.news.view_all")}{" "}
              <IconArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </motion.div>

        {loadingNews ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : errorNews ? (
          <ErrorState onRetry={() => refetchNews()} />
        ) : latestNews.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={STAGGER_CONTAINER}
          >
            {latestNews.map((article) => (
              <motion.div
                key={article.id}
                variants={SCALE_IN}
                className="h-full"
              >
                <NewsCard article={article} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div variants={FADE_UP_ITEM} className="text-center py-12">
            <Card className="max-w-md mx-auto p-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <IconNews size={32} className="text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-text-main mb-2">
                {t("sections.news.empty_title")}
              </h3>
              <p className="text-text-muted mb-6">
                {t("sections.news.empty_desc")}
              </p>
              <Link href={ROUTES.NOTICIAS}>
                <Button variant="outline" size="sm">
                  {t("sections.news.empty_btn")}
                </Button>
              </Link>
            </Card>
          </motion.div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.NOTICIAS}>
            <Button variant="outline" className="w-full">
              {t("sections.news.empty_btn")}
            </Button>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};
