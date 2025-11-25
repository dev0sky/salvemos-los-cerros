import React from 'react';
import { motion } from 'framer-motion';
import { IconFilter, IconCalendarEvent } from '@tabler/icons-react';
import { EventCard } from '@/components/EventCard';
import { Button } from '@/components/ui/Button';
import { STRINGS } from '@/constants/strings';
import { useAppStore } from '@/stores/useAppStore';
import { MOCK_EVENTS } from '@/data/events';

export const EventosPage: React.FC = () => {
  const { eventFilter, setEventFilter } = useAppStore();

  const now = new Date();
  const filteredEvents = MOCK_EVENTS.filter(event => {
    const eventDate = new Date(event.date);
    if (eventFilter === 'upcoming') return eventDate >= now;
    if (eventFilter === 'past') return eventDate < now;
    return true;
  });

  const filters = [
    { value: 'all' as const, label: STRINGS.FILTER_ALL },
    { value: 'upcoming' as const, label: STRINGS.FILTER_UPCOMING },
    { value: 'past' as const, label: STRINGS.FILTER_PAST },
  ];

  return (
    <div className="space-y-12 md:space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-surface rounded-b-3xl p-10 md:p-20 border-b border-border-soft">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <IconCalendarEvent size={16} />
              <span>Próximos Eventos</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              {STRINGS.EVENTOS_TITLE}
            </h1>
            <p className="text-text-muted text-lg">
              {STRINGS.EVENTOS_SUBTITLE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-3 flex-wrap">
          <IconFilter size={20} className="text-text-muted" />
          <span className="text-sm font-medium text-text-muted">Filtrar por:</span>
          {filters.map((filter) => (
            <Button
              key={filter.value}
              variant={eventFilter === filter.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setEventFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">No hay eventos con este filtro.</p>
          </div>
        )}
      </section>
    </div>
  );
};
