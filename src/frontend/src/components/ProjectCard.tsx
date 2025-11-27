import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconMap,
} from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import type { Project } from "@/types";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
}

const STATUS_VARIANTS = {
  active: "primary",
  completed: "success",
  planned: "warning",
} as const;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
        {project.image && (
          <div className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <Badge variant={STATUS_VARIANTS[project.status]}>
              {t(`project_card.status.${project.status}`)}
            </Badge>
            <span className="text-xs text-text-muted">
              {project.progress}
              {t("project_card.completed_label")}
            </span>
          </div>

          <h3 className="text-xl font-semibold text-text-main mb-2">
            {project.title}
          </h3>

          <p className="text-text-muted text-sm mb-4 flex-1">
            {project.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconMapPin size={16} className="text-primary flex-shrink-0" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconCalendar size={16} className="text-primary flex-shrink-0" />
              <span>{project.startDate}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-border-soft rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border-soft">
            <div className="flex gap-2">
              <Link href="/mapa">
                <a
                  className="text-xs text-primary flex items-center gap-1 hover:underline"
                  title={t("project_card.map")}
                >
                  <IconMap size={14} /> {t("project_card.map")}
                </a>
              </Link>
            </div>
            <a
              href="#"
              className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap"
            >
              {t("project_card.view_details")} <IconArrowRight size={14} />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
