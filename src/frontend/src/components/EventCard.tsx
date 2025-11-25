import React from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconMapPin, IconUsers, IconClock } from '@tabler/icons-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'cleanup' | 'reforestation' | 'workshop' | 'other';
  attendees: number;
  maxAttendees?: number;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const typeVariants = {
    cleanup: 'primary',
    reforestation: 'success',
    workshop: 'warning',
    other: 'default',
  } as const;

  const typeLabels = {
    cleanup: 'Limpieza',
    reforestation: 'Reforestación',
    workshop: 'Taller',
    other: 'Otro',
  };

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
          <div className="w-full h-48 bg-secondary/10 -m-6 mb-4">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <Badge variant={typeVariants[event.type]}>
            {typeLabels[event.type]}
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
            <IconCalendar size={16} className="text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <IconClock size={16} className="text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <IconMapPin size={16} className="text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <IconUsers size={16} className="text-primary" />
            <span>
              {event.attendees} {event.maxAttendees ? `/ ${event.maxAttendees}` : ''} participantes
            </span>
          </div>
        </div>

        {!isPast && (
          <Button 
            variant={isFull ? "outline" : "primary"} 
            size="sm" 
            className="w-full"
            disabled={!!isFull}
          >
            {isFull ? 'Evento lleno' : 'Registrarse'}
          </Button>
        )}
      </Card>
    </motion.div>
  );
};
