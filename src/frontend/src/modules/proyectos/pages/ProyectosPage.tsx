import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconFilter } from "@tabler/icons-react";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useAppStore } from "@/stores/useAppStore";
import { useProjects } from "@/hooks/useData";
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
    { value: "all" as const, label: t("filters.all") },
    { value: "active" as const, label: t("filters.active") },
    { value: "completed" as const, label: t("filters.completed") },
    { value: "planned" as const, label: t("filters.planned") },
  ];

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      <section className="bg-surface rounded-3xl p-10 md:p-16 text-center space-y-6">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-text-main"
          variants={FADE_UP_ITEM}
        >
          {t("proyectos_page.title")}
        </motion.h1>
        <motion.p
          className="text-lg text-text-muted max-w-2xl mx-auto"
          variants={FADE_UP_ITEM}
        >
          {t("proyectos_page.subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 pt-6"
          variants={FADE_UP_ITEM}
        >
          <div className="flex items-center gap-2 mr-4">
            <IconFilter size={20} className="text-text-muted" />
            <span className="text-sm font-medium text-text-muted">
              {t("sections.projects.filter_label")}
            </span>
          </div>
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
