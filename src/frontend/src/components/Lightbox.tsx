import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
  IconDownload,
  Icon3dCubeSphere,
} from "@tabler/icons-react";
import type { GalleryImage } from "@/types";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex: initialIndex,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [is360Mode, setIs360Mode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const currentImage = images[currentIndex];
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotation = useMotionValue(0);
  const rotateY = useTransform(rotation, [-100, 100], [-180, 180]);

  useEffect(() => {
    setZoom(1);
    x.set(0);
    y.set(0);
    rotation.set(0);
    setIs360Mode(false);
  }, [currentIndex, x, y, rotation]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
    x.set(0);
    y.set(0);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImage.imageUrl;
    link.download = `${currentImage.title}.jpg`;
    link.click();
  };

  const toggle360Mode = () => {
    setIs360Mode(!is360Mode);
    handleResetZoom();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "+" || e.key === "=") handleZoomIn();
    if (e.key === "-") handleZoomOut();
    if (e.key === "0") handleResetZoom();
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/98 flex flex-col overflow-hidden"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Top Bar */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-gradient-to-b from-black/80 to-transparent z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-white/80 text-xs md:text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30 text-xs md:text-base"
              title="Zoom Out (-)"
            >
              <IconZoomOut size={16} className="md:w-5 md:h-5" />
            </button>

            <span className="text-white/80 text-xs md:text-sm font-medium min-w-[45px] md:min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 4}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
              title="Zoom In (+)"
            >
              <IconZoomIn size={16} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle360Mode();
              }}
              className={`p-1.5 md:p-2 rounded-lg transition-all ${
                is360Mode
                  ? "bg-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="360° Mode"
            >
              <Icon3dCubeSphere size={16} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Fullscreen"
            >
              <IconMaximize size={16} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Download"
            >
              <IconDownload size={16} className="md:w-5 md:h-5" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 md:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Close (Esc)"
            >
              <IconX size={16} className="md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 hover:scale-110"
          >
            <IconChevronLeft size={24} className="md:w-8 md:h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 hover:scale-110"
          >
            <IconChevronRight size={24} className="md:w-8 md:h-8" />
          </button>
        </>
      )}

      {/* Image Container - FIT TO SCREEN */}
      <div
        className="flex-1 flex items-center justify-center min-h-0 px-2 md:px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            ref={imageRef}
            src={currentImage.imageUrl}
            alt={currentImage.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`max-w-full max-h-full w-auto h-auto object-contain select-none rounded-lg ${
              zoom > 1 || is360Mode ? "cursor-move" : "cursor-default"
            }`}
            style={{
              scale: zoom,
              x: is360Mode ? 0 : x,
              y: is360Mode ? 0 : y,
              rotateY: is360Mode ? rotateY : 0,
              transformStyle: "preserve-3d",
            }}
            drag={zoom > 1 && !is360Mode}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onPan={(_event, info) => {
              if (is360Mode) {
                rotation.set(rotation.get() + info.delta.x * 0.5);
              }
            }}
            whileHover={{ scale: zoom > 1 ? zoom : zoom * 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Info - ALWAYS VISIBLE */}
      <div className="flex-shrink-0 p-3 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-white mb-2 md:mb-3">
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 line-clamp-1">
              {currentImage.title}
            </h3>
            <p className="text-xs md:text-sm text-white/80 line-clamp-1 md:line-clamp-2">
              {currentImage.description}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 md:gap-4 text-xs text-white/60 flex-wrap mb-2 md:mb-3">
            <span>📅 {currentImage.date}</span>
            {currentImage.photographer && (
              <span>📷 {currentImage.photographer}</span>
            )}
            {currentImage.tags && currentImage.tags.length > 0 && (
              <div className="flex gap-1 md:gap-2">
                {currentImage.tags.slice(0, 2).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-full bg-white/10 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-1.5 md:gap-2 justify-center overflow-x-auto pb-1 md:pb-2 scrollbar-hide">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    idx === currentIndex
                      ? "ring-2 ring-primary scale-110"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-12 h-12 md:w-16 md:h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {!isDragging && zoom === 1 && !is360Mode && (
            <p className="mt-1 md:mt-2 text-white/40 text-xs text-center hidden md:block">
              Use +/- to zoom • Click 360° for interactive view • Drag to pan
              when zoomed
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
