import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconMap,
} from "@tabler/icons-react";
import { Link } from "wouter";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Lightbox } from "./Lightbox";
import type { Project, GalleryImage } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const STATUS_VARIANTS = {
  active: "primary",
  completed: "success",
  planned: "warning",
  paused: "default",
} as const;

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { t } = useTranslation();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryImage: GalleryImage = {
    id: project.id,
    title: project.title,
    description: project.description,
    imageUrl: project.image || "",
    category: "project",
    date: project.startDate,
    tags: [project.status, project.location],
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl hover:border-primary/30 transition-all duration-300">
          {project.image && (
            <div
              className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden cursor-pointer group/image"
              onClick={() => setLightboxOpen(true)}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                transition={{ duration: 0.3 }}
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
                <IconCalendar
                  size={16}
                  className="text-primary flex-shrink-0"
                />
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
              <Link href={`/proyectos/${project.id}`}>
                <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
                  {t("project_card.view_details")} <IconArrowRight size={14} />
                </a>
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>

      {lightboxOpen &&
        project.image &&
        createPortal(
          <AnimatePresence>
            <Lightbox
              images={[galleryImage]}
              currentIndex={0}
              onClose={() => setLightboxOpen(false)}
            />
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
