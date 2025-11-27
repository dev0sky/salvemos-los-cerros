import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "lg",
  className = "",
}) => {
  const { t } = useTranslation();
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-16 h-16 border-4",
  };

  if (size === "sm") {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <motion.div
          className={`absolute inset-0 border-t-current border-r-transparent border-b-transparent border-l-transparent rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        size === "lg" ? "h-[50vh]" : ""
      } w-full gap-4 ${className}`}
    >
      <div className={`relative ${sizeClasses[size]}`}>
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-primary/30 rounded-full`}
          initial={{ opacity: 0.5, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className={`absolute inset-0 ${sizeClasses[size]} border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      {size === "lg" && (
        <motion.p
          className="text-text-muted font-medium animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {t("loadingSpinner.loading_content")}
        </motion.p>
      )}
    </div>
  );
};
