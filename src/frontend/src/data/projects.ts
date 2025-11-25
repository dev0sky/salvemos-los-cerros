import type { Project } from '@/types';
import { getStaticPhoto, IMAGE_TOPICS } from '@/services/imageService';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Declaratoria de Área Natural Protegida - Cerro Grande',
    description: 'Iniciativa ciudadana para declarar el Cerro Grande (Arewákawi) como Área Natural Protegida. Incluye amparo legal y audiencias públicas con autoridades estatales.',
    location: 'Cerro Grande, Chihuahua',
    status: 'active',
    progress: 75,
    startDate: '2020',
    image: getStaticPhoto(IMAGE_TOPICS.MOUNTAINS, 800, 600),
  },
  {
    id: '2',
    title: 'Huerto Comunitario Cerro Coronel',
    description: 'Transformación de un antiguo estacionamiento ilegal en huerto comunitario y zona reforestada con plantas nativas en el Cerro Coronel.',
    location: 'Cerro Coronel, Chihuahua',
    status: 'completed',
    progress: 100,
    startDate: '2025',
    image: getStaticPhoto(IMAGE_TOPICS.REFORESTATION, 800, 600),
  },
  {
    id: '3',
    title: 'Protección de 4 Cerros como Zonas Naturales',
    description: 'Acuerdo municipal para declarar 4 cerros (Coronel, Grande, Cañón del Marro, Picos de la Luna) como zonas naturales protegidas antes de 2028.',
    location: 'Chihuahua Capital',
    status: 'active',
    progress: 45,
    startDate: '2023',
    image: getStaticPhoto(IMAGE_TOPICS.CONSERVATION, 800, 600),
  },
  {
    id: '4',
    title: 'Plan de Prevención Atmosférica',
    description: 'Plan impulsado por el colectivo con más del 95% de apoyo ciudadano en consulta pública para prevenir tormentas de arena causadas por desmonte.',
    location: 'Estado de Chihuahua',
    status: 'active',
    progress: 60,
    startDate: '2025',
    image: getStaticPhoto(IMAGE_TOPICS.NATURE, 800, 600),
  },
  {
    id: '5',
    title: 'Denuncia ante PROFEPA - Cerro del Caballo',
    description: 'Denuncia legal contra fraccionamiento en el Cerro del Caballo que viola legislación ambiental. Incluye acciones legales de PROFEPA.',
    location: 'Cerro del Caballo, Chihuahua',
    status: 'active',
    progress: 55,
    startDate: '2024',
    image: getStaticPhoto(IMAGE_TOPICS.CLEANUP, 800, 600),
  },
  {
    id: '6',
    title: 'Restauración Post-Incendio',
    description: 'Programa de restauración de áreas afectadas por incendios forestales que destruyeron árboles centenarios y especies nativas.',
    location: 'Cerros de Chihuahua',
    status: 'planned',
    progress: 20,
    startDate: '2024',
    image: getStaticPhoto(IMAGE_TOPICS.BIRDS, 800, 600),
  },
];

export const PROJECT_STATS_DATA = [
  { month: '2020', proyectos: 1 },
  { month: '2022', proyectos: 1 },
  { month: '2023', proyectos: 2 },
  { month: '2024', proyectos: 2 },
  { month: '2025', proyectos: 3 },
];
