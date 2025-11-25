import React from 'react';
import { motion } from 'framer-motion';
import { IconMapPin, IconCalendar, IconArrowRight } from '@tabler/icons-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const STATUS_VARIANTS = {
  active: 'success',
  completed: 'primary',
  planned: 'warning',
} as const;

const STATUS_LABELS = {
  active: 'Activo',
  completed: 'Completado',
  planned: 'Planificado',
};


export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {project.image && (
          <div className="w-full h-48 bg-secondary/10 -m-6 mb-4">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant={STATUS_VARIANTS[project.status]}>
            {STATUS_LABELS[project.status]}
          </Badge>
          <span className="text-xs text-text-muted">{project.progress}% completado</span>
        </div>

        <h3 className="text-xl font-semibold text-text-main mb-2">
          {project.title}
        </h3>

        <p className="text-text-muted text-sm mb-4 flex-1">
          {project.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <IconMapPin size={16} className="text-primary" />
            <span>{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <IconCalendar size={16} className="text-primary" />
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

        <Button variant="outline" size="sm" className="w-full group">
          Ver detalles
          <IconArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Card>
    </motion.div>
  );
};
