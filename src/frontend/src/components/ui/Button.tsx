import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  ...props
}) => {
  const variants = {
    primary: "bg-primary text-white hover:opacity-90 shadow-sm",
    secondary: "bg-secondary text-white hover:opacity-90 shadow-sm",
    outline: "border border-primary text-primary hover:bg-primary/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 font-semibold",
    lg: "px-8 py-3 font-semibold",
  };

  return (
    <button
      className={cn(
        "rounded-xl transition-all duration-200 active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
};
