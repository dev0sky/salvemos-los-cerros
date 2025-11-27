import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { IconCalendarEvent, IconFilter } from "@tabler/icons-react";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useEvents } from "@/hooks/useData";
import {
  PAGE_VARIANTS,
  FADE_UP_ITEM,
  SCALE_IN,
  HOVER_LIFT,
} from "@/constants/animations";
import { ErrorState } from "@/components/ui/ErrorState";

export const EventosPage: React.FC = () => {
  const { t } = useTranslation();
  const { data: events = [], isLoading, error, refetch } = useEvents();
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const filteredEvents = events.filter((event) => {
    if (filter === "all") return true;
    const isPast = new Date(event.date) < new Date();
    return filter === "past" ? isPast : !isPast;
  });

  const filters = [
    { value: "all" as const, label: t("filters.all") },
    { value: "upcoming" as const, label: t("filters.upcoming") },
    { value: "past" as const, label: t("filters.past") },
  ];

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      <section className="bg-surface rounded-3xl p-10 md:p-16 text-center space-y-6">
        <motion.div
          className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full text-primary mb-4"
          variants={FADE_UP_ITEM}
        >
          <IconCalendarEvent size={32} />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-text-main"
          variants={FADE_UP_ITEM}
        >
          {t("eventos_page.title")}
        </motion.h1>
        <motion.p
          className="text-lg text-text-muted max-w-2xl mx-auto"
          variants={FADE_UP_ITEM}
        >
          {t("eventos_page.subtitle")}
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 pt-6"
          variants={FADE_UP_ITEM}
        >
          <div className="flex items-center gap-2 mr-4">
            <IconFilter size={20} className="text-text-muted" />
            <span className="text-sm font-medium text-text-muted">
              {t("eventos_page.filter_label")}
            </span>
          </div>
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "primary" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className="transition-all duration-300"
            >
              {f.label}
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
        ) : filteredEvents.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={SCALE_IN}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  whileHover={HOVER_LIFT}
                >
                  <EventCard event={event} />
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
            <p className="text-text-muted">{t("eventos_page.no_events")}</p>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
};
