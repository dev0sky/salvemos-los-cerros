import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconUsers,
  IconArrowRight,
  IconMap,
} from "@tabler/icons-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Lightbox } from "./Lightbox";
import type { Event, GalleryImage } from "@/types";
import { Link } from "wouter";

interface EventCardProps {
  event: Event;
}

const CATEGORY_VARIANTS = {
  cleanup: "success",
  reforestation: "primary",
  workshop: "warning",
  conference: "secondary",
  fundraising: "danger",
  other: "default",
} as const;

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { t } = useTranslation();
  const startDate = new Date(event.startDatetime);
  const isPast = startDate < new Date();
  const isFull = event.maxAttendees && event.attendees >= event.maxAttendees;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const dateStr = startDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = startDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const galleryImage: GalleryImage = {
    id: event.id,
    title: event.title,
    description: event.description,
    imageUrl: event.image || "",
    category: "event",
    date: event.startDatetime,
    tags: [event.category, event.location],
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
          {event.image && (
            <div
              className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden cursor-pointer group/image"
              onClick={() => setLightboxOpen(true)}
            >
              <motion.img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <Badge variant={CATEGORY_VARIANTS[event.category]}>
                {t(`event_card.types.${event.category}`)}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <IconUsers size={14} />
                <span>
                  {event.attendees}
                  {event.maxAttendees ? `/${event.maxAttendees}` : ""}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-text-main mb-2">
              {event.title}
            </h3>

            <p className="text-text-muted text-sm mb-4 flex-1">
              {event.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <IconCalendar
                  size={16}
                  className="text-primary flex-shrink-0"
                />
                <span>{dateStr}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <IconClock size={16} className="text-primary flex-shrink-0" />
                <span>{timeStr}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-muted">
                <IconMapPin size={16} className="text-primary flex-shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border-soft">
              <div className="flex gap-2">
                <Link href="/mapa">
                  <a
                    className="text-xs text-primary flex items-center gap-1 hover:underline"
                    title={t("event_card.map_title")}
                  >
                    <IconMap size={14} /> {t("event_card.map_label")}
                  </a>
                </Link>
              </div>
              {!isPast ? (
                <Link href={`/eventos/${event.id}`}>
                  <a
                    className={`text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap ${
                      isFull
                        ? "text-text-muted cursor-not-allowed"
                        : "text-primary"
                    }`}
                  >
                    {isFull
                      ? t("event_card.status.full")
                      : t("event_card.status.register")}{" "}
                    {!isFull && <IconArrowRight size={14} />}
                  </a>
                </Link>
              ) : (
                <span className="text-xs text-text-muted">
                  {t("event_card.status.finished")}
                </span>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {lightboxOpen &&
        event.image &&
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
