import React, { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import {
  IconChevronLeft,
  IconChevronRight,
  IconDownload,
} from "@tabler/icons-react";
import api from "../../../lib/api";
import { Link } from "wouter";
import { ROUTES } from "../../../constants/routes";

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    const start = format(startOfMonth(currentDate), "yyyy-MM-dd");
    const end = format(endOfMonth(currentDate), "yyyy-MM-dd");
    try {
      const response = await api.get(`/events/?start=${start}&end=${end}`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const exportCalendar = () => {
    // Simple CSV export
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Title,Date,Type\n" +
      events.map((e) => `${e.title},${e.date},${e.type}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `calendario_${format(currentDate, "yyyy_MM")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-card rounded-2xl shadow-sm border border-border-soft p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-text-main capitalize">
          {format(currentDate, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-primary transition-colors"
          >
            <IconChevronLeft size={24} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-surface rounded-full text-text-muted hover:text-primary transition-colors"
          >
            <IconChevronRight size={24} />
          </button>
          <button
            onClick={exportCalendar}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            <IconDownload size={18} />
            Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border-soft rounded-lg overflow-hidden border border-border-soft">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="bg-surface p-2 text-center text-sm font-semibold text-text-muted"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] bg-card p-2 ${
                !isSameMonth(day, currentDate)
                  ? "bg-surface/50 text-text-muted/50"
                  : ""
              }`}
            >
              <div
                className={`text-right text-sm mb-1 ${
                  isSameDay(day, new Date()) ? "font-bold text-primary" : ""
                }`}
              >
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={ROUTES.EVENTO_DETALLE.replace(
                      ":id",
                      event.id.toString()
                    )}
                  >
                    <a className="block text-xs p-1 rounded bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors truncate">
                      {event.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
