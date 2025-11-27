import React from "react";
import { useParams, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  IconMapPin,
  IconCalendar,
  IconClock,
  IconUsers,
  IconArrowLeft,
  IconCheck,
  IconMap,
  IconPhone,
  IconExternalLink,
} from "@tabler/icons-react";
import { useEvents } from "@/hooks/useData";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PAGE_VARIANTS, FADE_UP_ITEM } from "@/constants/animations";

const TYPE_VARIANTS = {
  cleanup: "success",
  reforestation: "primary",
  workshop: "warning",
  conference: "primary",
  fundraising: "warning",
  other: "default",
} as const;

export const EventoDetallePage: React.FC = () => {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { t } = useTranslation();
  const { data: events = [], isLoading } = useEvents();

  const event = events.find((e) => String(e.id) === id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">
          {t("event_detail.not_found")}
        </h1>
        <Button onClick={() => navigate("/eventos")}>
          {t("event_detail.back_to_events")}
        </Button>
      </div>
    );
  }

  const isPast = new Date(event.startDatetime) < new Date();
  const isFull = event.maxAttendees && event.attendees >= event.maxAttendees;

  return (
    <motion.div
      className="space-y-12 md:space-y-20 pb-20"
      initial="hidden"
      animate="visible"
      variants={PAGE_VARIANTS}
    >
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/eventos")}
          className="flex items-center gap-2"
        >
          <IconArrowLeft size={16} />
          {t("event_detail.back")}
        </Button>
      </div>

      {/* Hero Section with Image */}
      {event.image && (
        <section className="relative h-96 md:h-[30rem] overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-primary/30" />
          <motion.div
            className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12 container mx-auto"
            variants={FADE_UP_ITEM}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <Badge variant={TYPE_VARIANTS[event.category]}>
                {t(`event_card.types.${event.category}`)}
              </Badge>
              {isPast && (
                <Badge variant="default">{t("event_card.status.past")}</Badge>
              )}
              {isFull && !isPast && (
                <Badge variant="danger">{t("event_card.status.full")}</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <IconCalendar size={16} />
                <span>
                  {new Date(event.startDatetime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconClock size={16} />
                <span>
                  {new Date(event.startDatetime).toLocaleTimeString()}
                  {event.endDatetime &&
                    ` - ${new Date(event.endDatetime).toLocaleTimeString()}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IconMapPin size={16} />
                <span>{event.location}</span>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-text-main mb-4">
                {t("event_detail.description")}
              </h2>
              <p className="text-text-muted leading-relaxed whitespace-pre-line">
                {event.content || event.description}
              </p>
            </Card>

            {/* Location Details */}
            {event.locationDetails && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <IconMapPin size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">
                    {t("event_detail.location_details")}
                  </h2>
                </div>
                <p className="text-text-muted leading-relaxed whitespace-pre-line">
                  {event.locationDetails}
                </p>
                {(event.latitude || event.longitude) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 flex items-center gap-2"
                    onClick={() => navigate("/mapa")}
                  >
                    <IconMap size={16} />
                    {t("event_detail.view_on_map")}
                  </Button>
                )}
              </Card>
            )}

            {/* Requirements */}
            {event.requirements && event.requirements.length > 0 && (
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent-green/10 rounded-full text-accent-green">
                    <IconCheck size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-text-main">
                    {t("event_detail.requirements")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {event.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <IconCheck
                        size={20}
                        className="text-accent-green flex-shrink-0 mt-1"
                      />
                      <span className="text-text-muted">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Gallery */}
            {event.gallery_images && event.gallery_images.length > 0 && (
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-text-main mb-6">
                  {t("event_detail.gallery")}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {event.gallery_images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`${event.title} - ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Attendance Card */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-text-main mb-4">
                {t("event_detail.attendance")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconUsers size={20} className="text-primary" />
                    <span className="text-text-muted text-sm">
                      {t("event_detail.registered")}
                    </span>
                  </div>
                  <span className="font-bold text-primary">
                    {event.attendees}
                    {event.maxAttendees && ` / ${event.maxAttendees}`}
                  </span>
                </div>
                {event.maxAttendees && (
                  <div>
                    <div className="w-full bg-border-soft rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          isFull ? "bg-red-500" : "bg-primary"
                        }`}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (event.attendees / event.maxAttendees) * 100
                          }%`,
                        }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                )}
                {!isPast && (
                  <div className="pt-4 border-t border-border-soft">
                    {event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        <Button
                          variant={isFull ? "outline" : "primary"}
                          size="sm"
                          className="w-full flex items-center justify-center gap-2"
                          disabled={!!isFull}
                        >
                          {isFull
                            ? t("event_card.status.event_full")
                            : t("event_card.status.register")}
                          {!isFull && <IconExternalLink size={16} />}
                        </Button>
                      </a>
                    ) : (
                      <Button
                        variant={isFull ? "outline" : "primary"}
                        size="sm"
                        className="w-full"
                        disabled={!!isFull}
                      >
                        {isFull
                          ? t("event_card.status.event_full")
                          : t("event_card.status.register")}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>

            {/* Contact Info */}
            {event.contactInfo && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-secondary/10 rounded-full text-secondary">
                    <IconPhone size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {t("event_detail.contact")}
                  </h3>
                </div>
                <p className="text-sm text-text-muted">{event.contactInfo}</p>
              </Card>
            )}

            {/* Organizers */}
            {event.organizers && event.organizers.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <IconUsers size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-text-main">
                    {t("event_detail.organizers")}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {event.organizers.map((organizer, index) => (
                    <li
                      key={index}
                      className="text-sm text-text-muted flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {organizer}
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
