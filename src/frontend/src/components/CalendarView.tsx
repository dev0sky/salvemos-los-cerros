import React, { useState } from "react";
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
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Event } from "@/types";
import { Link } from "wouter";

interface CalendarViewProps {
  events: Event[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth)),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const getEventsForDay = (day: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startDatetime), day)
    );
  };

  return (
    <div className="bg-card rounded-3xl shadow-sm border border-border-soft overflow-hidden">
      {/* Header */}
      <div className="p-6 flex items-center justify-between border-b border-border-soft bg-surface/50">
        <h2 className="text-2xl font-bold text-text-main capitalize">
          {format(currentMonth, "MMMM yyyy", { locale: es })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-primary/10 rounded-full text-text-muted hover:text-primary transition-colors"
          >
            <IconChevronLeft size={24} />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-primary/10 rounded-full text-text-muted hover:text-primary transition-colors"
          >
            <IconChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 text-center border-b border-border-soft bg-surface/30">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div key={day} className="py-3 text-sm font-semibold text-text-muted">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <div
              key={day.toString()}
              className={`min-h-[120px] p-2 border-b border-r border-border-soft relative group transition-colors hover:bg-surface/50 ${
                !isCurrentMonth ? "bg-surface/20 text-text-muted/50" : "bg-card"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                    isSameDay(day, new Date()) ? "bg-primary text-white" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>

              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <Link key={event.id} href={`/eventos/${event.id}`}>
                    <a
                      className="block text-xs p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all truncate font-medium"
                      title={event.title}
                    >
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
