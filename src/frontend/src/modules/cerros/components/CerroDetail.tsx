import React from 'react';
import { motion, Variants } from 'framer-motion';
import { IconMountain, IconMapPin, IconAlertTriangle, IconLeaf, IconPaw, IconHistory, IconPick } from '@tabler/icons-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Cerro } from '@/data/cerros';
import { MapComponent } from '@/components/Map/MapComponent';

interface CerroDetailProps {
  cerro: Cerro;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

export const CerroDetail: React.FC<CerroDetailProps> = ({ cerro }) => {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Image */}
      <motion.div 
        className="relative h-[400px] rounded-3xl overflow-hidden shadow-lg"
        variants={imageVariants}
      >
        <img 
          src={cerro.image} 
          alt={cerro.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-8 md:p-12">
          <motion.div 
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-3 backdrop-blur-md bg-primary/90 border-none text-white px-3 py-1 text-sm">
              {cerro.altitude} m
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">{cerro.name}</h1>
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <IconMapPin size={20} />
              <span>{cerro.location.municipality}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Ecological Value */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <IconLeaf size={24} />
              </div>
              Valor Ecológico
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow duration-300 border-l-4 border-l-green-500">
                <h3 className="font-semibold text-green-700 mb-3 flex items-center gap-2 text-lg">
                  <IconLeaf size={20} /> Flora
                </h3>
                <ul className="space-y-2">
                  {cerro.ecological_value.flora.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="hover:shadow-md transition-shadow duration-300 border-l-4 border-l-amber-500">
                <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2 text-lg">
                  <IconPaw size={20} /> Fauna
                </h3>
                <ul className="space-y-2">
                  {cerro.ecological_value.fauna.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </motion.section>

          {/* Cultural & Geology */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                <IconHistory size={24} />
              </div>
              Historia y Geología
            </h2>
            <Card className="space-y-6 hover:shadow-md transition-shadow duration-300">
              <div>
                <h3 className="font-semibold text-text-main mb-3 text-lg">Valor Cultural</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cerro.ecological_value.cultural.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-text-muted text-sm bg-surface p-2 rounded-lg">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border-soft pt-6">
                <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2 text-lg">
                  <IconMountain size={20} className="text-secondary" /> Geología
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm bg-surface p-4 rounded-xl">
                  <div>
                    <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Tipo de Roca</span>
                    <span className="font-semibold text-text-main text-base">{cerro.geology.rock}</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Era Geológica</span>
                    <span className="font-semibold text-text-main text-base">{cerro.geology.age}</span>
                  </div>
                  <div className="sm:col-span-2 border-t border-border-soft/50 pt-3 mt-1">
                    <span className="text-text-muted block text-xs uppercase tracking-wider mb-1">Notas</span>
                    <span className="text-text-main leading-relaxed">{cerro.geology.notes}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        </div>

        {/* Sidebar */}
        <motion.div className="space-y-6" variants={itemVariants}>
          {/* Map */}
          <Card className="p-0 overflow-hidden shadow-md border-0 ring-1 ring-border-soft">
            <MapComponent 
              cerros={[cerro]} 
              center={[cerro.location.lat, cerro.location.lng]} 
              zoom={14} 
              height="300px"
            />
          </Card>

          {/* Legal Status */}
          <Card className="hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-text-main mb-4 flex items-center gap-2">
              <IconPick size={18} className="text-primary" /> Estatus Legal
            </h3>
            <div className="space-y-4">
              <div className="bg-surface p-3 rounded-lg">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Protección Propuesta</span>
                <p className="font-medium text-primary">{cerro.legal_status.proposed_protection}</p>
              </div>
              <div className="bg-surface p-3 rounded-lg">
                <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">Estado Actual</span>
                <p className="text-sm text-text-main">{cerro.legal_status.status}</p>
              </div>
            </div>
          </Card>

          {/* Threats */}
          <Card className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
              <IconAlertTriangle size={18} /> Amenazas
            </h3>
            <ul className="space-y-3">
              {cerro.threats.map((threat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-800 bg-white/60 p-2 rounded-md">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {threat}
                </li>
              ))}
            </ul>
          </Card>

          {/* Materials */}
          <Card className="hover:shadow-md transition-shadow duration-300">
            <h3 className="font-semibold text-text-main mb-3 flex items-center gap-2">
              <IconPick size={18} className="text-secondary" /> Recursos Minerales
            </h3>
            <p className="text-sm text-text-muted bg-surface p-3 rounded-lg leading-relaxed">
              {cerro.materials.minerals}
            </p>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
