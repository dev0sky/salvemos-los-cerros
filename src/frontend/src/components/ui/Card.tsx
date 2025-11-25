import React from 'react';
import { cn } from '@/lib/utils';


interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'bg-card rounded-2xl shadow-sm border border-border-soft p-6 space-y-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
