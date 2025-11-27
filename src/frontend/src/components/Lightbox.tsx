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

  // Motion values for pan
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 360° rotation
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
      className="fixed inset-0 z-50 bg-black/98 flex flex-col"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Top Bar */}
      <div className="flex-shrink-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-20">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <span className="text-white/80 text-sm font-medium">
            {currentIndex + 1} / {images.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
              title="Zoom Out (-)"
            >
              <IconZoomOut size={20} />
            </button>

            <span className="text-white/80 text-sm font-medium min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 4}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
              title="Zoom In (+)"
            >
              <IconZoomIn size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle360Mode();
              }}
              className={`p-2 rounded-lg transition-all ${
                is360Mode
                  ? "bg-primary text-white"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
              title="360° Mode"
            >
              <Icon3dCubeSphere size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Fullscreen"
            >
              <IconMaximize size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Download"
            >
              <IconDownload size={20} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
              title="Close (Esc)"
            >
              <IconX size={20} />
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
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 hover:scale-110"
          >
            <IconChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all z-20 hover:scale-110"
          >
            <IconChevronRight size={32} />
          </button>
        </>
      )}

      {/* Image Container - FULL SIZE */}
      <div
        className="flex-1 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            <motion.img
              ref={imageRef}
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className={`w-auto h-auto object-contain select-none rounded-lg ${
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
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Info */}
      <div className="flex-shrink-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-xl md:text-2xl font-bold mb-2">
            {currentImage.title}
          </h3>
          <p className="text-white/80 text-sm md:text-base mb-3 line-clamp-2">
            {currentImage.description}
          </p>

          <div className="flex items-center justify-center gap-4 text-xs md:text-sm text-white/60 flex-wrap mb-3">
            <span>📅 {currentImage.date}</span>
            {currentImage.photographer && (
              <span>📷 {currentImage.photographer}</span>
            )}
            {currentImage.tags && currentImage.tags.length > 0 && (
              <div className="flex gap-2">
                {currentImage.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-full bg-white/10 text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 justify-center overflow-x-auto pb-2 scrollbar-hide">
              {images.map((image, idx) => (
                <button
                  key={image.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    idx === currentIndex
                      ? "ring-2 ring-primary scale-110"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {!isDragging && zoom === 1 && !is360Mode && (
            <p className="mt-2 text-white/40 text-xs">
              Use +/- to zoom • Click 360° for interactive view • Drag to pan
              when zoomed
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
