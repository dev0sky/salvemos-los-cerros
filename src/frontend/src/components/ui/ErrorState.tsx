import React from 'react';
import { motion } from 'framer-motion';
import { IconAlertCircle, IconRefresh } from '@tabler/icons-react';
import { Button } from './Button';
import { Card } from './Card';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  title = 'Ha ocurrido un error', 
  message = 'No pudimos cargar la información. Por favor, intenta de nuevo.', 
  onRetry,
  className = ''
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full ${className}`}
    >
      <Card className="flex flex-col items-center justify-center p-8 text-center border-red-100 bg-red-50/50">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
          <IconAlertCircle size={24} />
        </div>
        <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-red-700/80 mb-6 max-w-md">{message}</p>
        {onRetry && (
          <Button 
            onClick={onRetry} 
            variant="outline" 
            className="border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800 hover:border-red-300"
          >
            <IconRefresh size={16} className="mr-2" />
            Reintentar
          </Button>
        )}
      </Card>
    </motion.div>
  );
};
