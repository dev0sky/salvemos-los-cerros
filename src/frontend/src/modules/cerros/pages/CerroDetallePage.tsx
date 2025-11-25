import React from 'react';
import { useRoute } from 'wouter';
import { CerroDetail } from '../components/CerroDetail';
import { CERROS } from '@/data/cerros';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'wouter';

import { motion } from 'framer-motion';

export const CerroDetallePage: React.FC = () => {
  const [match, params] = useRoute('/cerros/:id');
  const cerroId = match ? params.id : null;
  const cerro = CERROS.find(c => c.id === cerroId);

  if (!cerro) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-text-main mb-4">Cerro no encontrado</h1>
        <Link href="/cerros">
          <a className="text-primary hover:underline">Volver a la lista</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <Link href="/cerros">
        <motion.a 
          className="inline-flex items-center gap-2 text-text-muted hover:text-primary mb-6 transition-colors cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ x: -4 }}
        >
          <IconArrowLeft size={20} />
          Volver a Cerros
        </motion.a>
      </Link>
      <CerroDetail cerro={cerro} />
    </div>
  );
};
