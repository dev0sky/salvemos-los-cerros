import React from 'react';
import { motion } from 'framer-motion';
import { IconMountain, IconMapPin, IconArrowRight } from '@tabler/icons-react';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Cerro } from '@/data/cerros';
import { Link } from 'wouter';

interface CerroCardProps {
  cerro: Cerro;
}

export const CerroCard: React.FC<CerroCardProps> = ({ cerro }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="w-full aspect-[4/3] bg-secondary/10 overflow-hidden relative">
          <img 
            src={cerro.image} 
            alt={cerro.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="primary">{cerro.altitude} m</Badge>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-text-main mb-2">
            {cerro.name}
          </h3>

          <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
            <IconMapPin size={16} className="text-primary flex-shrink-0" />
            <span className="line-clamp-1">{cerro.location.municipality}</span>
          </div>

          <div className="space-y-3 mb-6 flex-1">
            <div>
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
                Flora Principal
              </span>
              <p className="text-sm text-text-main line-clamp-2">
                {cerro.ecological_value.flora.join(', ')}
              </p>
            </div>
            <div>
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider block mb-1">
                Amenazas
              </span>
              <div className="flex flex-wrap gap-1">
                {cerro.threats.slice(0, 2).map((threat, index) => (
                  <Badge key={index} variant="danger" className="text-[10px] px-1.5 py-0.5">
                    {threat}
                  </Badge>
                ))}
                {cerro.threats.length > 2 && (
                  <span className="text-xs text-text-muted self-center">
                    +{cerro.threats.length - 2}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border-soft mt-auto">
            <div className="flex items-center gap-1 text-xs text-text-muted">
              <IconMountain size={14} />
              <span>Geología: {cerro.geology.age}</span>
            </div>
            <Link href={`/cerros/${cerro.id}`}>
              <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all whitespace-nowrap">
                Ver detalles <IconArrowRight size={14} />
              </a>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
