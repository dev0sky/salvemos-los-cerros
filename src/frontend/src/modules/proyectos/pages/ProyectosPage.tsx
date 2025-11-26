import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconFilter } from "@tabler/icons-react";
import { ProjectCard } from "@/components/ProjectCard";
import { BarChart } from "@/components/StatsChart";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { STRINGS } from "@/constants/strings";
import { useAppStore } from "@/stores/useAppStore";
import { useProjects } from "@/hooks/useData";
import { PROJECT_STATS_DATA } from "@/data/projects"; // Keep stats mock for now or calculate from data
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  SCALE_IN,
  HOVER_LIFT,
} from "@/constants/animations";

import { ErrorState } from "@/components/ui/ErrorState";

export const ProyectosPage: React.FC = () => {
  const { t } = useTranslation();
  const { projectFilter, setProjectFilter } = useAppStore();

  const { data: projects = [], isLoading, error, refetch } = useProjects();

  const filteredProjects = projects.filter(
    (project) => projectFilter === "all" || project.status === projectFilter
  );

  const filters = [
    { value: "all" as const, label: STRINGS.FILTER_ALL },
    { value: "active" as const, label: STRINGS.FILTER_ACTIVE },
    { value: "completed" as const, label: STRINGS.FILTER_COMPLETED },
    { value: "planned" as const, label: STRINGS.FILTER_PLANNED },
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
          <motion.div variants={FADE_UP_ITEM} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {STRINGS.PROYECTOS_TITLE}
            </h1>
            <p className="text-text-muted text-lg">
              {STRINGS.PROYECTOS_SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <motion.div
          className="bg-card rounded-2xl border border-border-soft p-6 md:p-8"
          variants={FADE_UP_ITEM}
        >
          <h2 className="text-2xl font-bold text-text-main mb-6">
            {t("sections.projects.stats_title")}
          </h2>
          <BarChart
            data={PROJECT_STATS_DATA}
            keys={["proyectos"]}
            indexBy="month"
          />
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <motion.div
          className="flex items-center gap-3 flex-wrap"
          variants={FADE_UP_ITEM}
        >
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">
            {t("sections.projects.filter_label")}
          </span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={projectFilter === filter.value ? "primary" : "outline"}
              size="sm"
              onClick={() => setProjectFilter(filter.value)}
              className="transition-all duration-300"
            >
              {filter.label}
            </Button>
          ))}
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section className="container mx-auto px-4">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : filteredProjects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={SCALE_IN}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  whileHover={HOVER_LIFT}
                >
                  <ProjectCard project={project} />
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
            <p className="text-text-muted">
              {t("sections.projects.no_filter_results")}
            </p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
