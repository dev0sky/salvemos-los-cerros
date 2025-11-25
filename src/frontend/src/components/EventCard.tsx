import React from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconClock, IconMapPin, IconUsers, IconArrowRight, IconMap } from '@tabler/icons-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import type { Event } from '@/types';
import { Link } from 'wouter';

interface EventCardProps {
  event: Event;
}

const TYPE_VARIANTS = {
  cleanup: 'success',
  reforestation: 'primary',
  workshop: 'warning',
  other: 'default',
} as const;

const TYPE_LABELS = {
  cleanup: 'Limpieza',
  reforestation: 'Reforestación',
  workshop: 'Taller',
  other: 'Otro',
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const isPast = new Date(event.date) < new Date();
  const isFull = event.maxAttendees && event.attendees >= event.maxAttendees;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        {event.image && (
          <div className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <Badge variant={TYPE_VARIANTS[event.type]}>
              {TYPE_LABELS[event.type]}
            </Badge>
            {isPast && <Badge variant="default">Pasado</Badge>}
            {isFull && !isPast && <Badge variant="danger">Lleno</Badge>}
          </div>

          <h3 className="text-xl font-semibold text-text-main mb-2">
            {event.title}
          </h3>

          <p className="text-text-muted text-sm mb-4 flex-1">
            {event.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconCalendar size={16} className="text-primary flex-shrink-0" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconClock size={16} className="text-primary flex-shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconMapPin size={16} className="text-primary flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <IconUsers size={16} className="text-primary flex-shrink-0" />
              <span>
                {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} participantes
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border-soft">
            <div className="flex gap-2">
               <Link href="/mapa">
                  <a className="text-xs text-primary flex items-center gap-1 hover:underline" title="Ver en mapa">
                    <IconMap size={14} /> Mapa
                  </a>
               </Link>
            </div>
            {!isPast ? (
              <a 
                href="#" 
                className={`text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap ${
                  isFull ? 'text-text-muted cursor-not-allowed' : 'text-primary'
                }`}
              >
                {isFull ? 'Evento lleno' : 'Registrarse'} <IconArrowRight size={14} />
              </a>
            ) : (
              <span className="text-xs text-text-muted">Evento finalizado</span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
