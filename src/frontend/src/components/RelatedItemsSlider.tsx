import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Link } from "wouter";
import { IconArrowRight, IconCalendar } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface RelatedItem {
  id: string;
  title: string;
  description?: string;
  images: string[];
  link: string;
  date?: string;
  category?: string;
}

interface RelatedItemsSliderProps {
  title: string;
  items: RelatedItem[];
}

export const RelatedItemsSlider: React.FC<RelatedItemsSliderProps> = ({
  title,
  items,
}) => {
  const { t } = useTranslation();

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      <h3 className="text-xl font-bold text-text-main border-l-4 border-primary pl-3">
        {title}
      </h3>
      <div className="w-full overflow-hidden rounded-2xl shadow-sm border border-border-soft bg-card">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          className="w-full"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col h-full">
                {/* Inner Slider for Images */}
                <div className="relative w-full aspect-video bg-surface/50 overflow-hidden">
                  {item.images.length > 1 ? (
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={0}
                      slidesPerView={1}
                      navigation
                      pagination={{ clickable: true, dynamicBullets: true }}
                      className="w-full h-full nested-swiper"
                      nested={true}
                    >
                      {item.images.map((img, idx) => (
                        <SwiperSlide key={`${item.id}-img-${idx}`}>
                          <img
                            src={img}
                            alt={`${item.title} - ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : item.images.length === 1 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                      {t("common.no_image")}
                    </div>
                  )}

                  {item.category && (
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2 py-1 text-xs font-semibold bg-white/90 text-primary rounded-md shadow-sm backdrop-blur-sm">
                        {item.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <Link href={item.link}>
                    <a className="block group">
                      <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </a>
                  </Link>

                  {item.date && (
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <IconCalendar size={14} />
                      <span>
                        {new Date(item.date).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "America/Chihuahua",
                        })}
                      </span>
                    </div>
                  )}

                  {item.description && (
                    <p className="text-sm text-text-muted line-clamp-2">
                      {item.description}
                    </p>
                  )}

                  <Link href={item.link}>
                    <a className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                      {t("common.view_more")} <IconArrowRight size={16} />
                    </a>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
