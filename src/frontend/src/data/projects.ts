import type { Project } from '@/types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Reforestación Cerro Grande',
    description: 'Plantación de 500 árboles nativos en la zona norte del Cerro Grande para restaurar el ecosistema local.',
    location: 'Cerro Grande, Zona Norte',
    status: 'active',
    progress: 65,
    startDate: 'Enero 2024',
  },
  {
    id: '2',
    title: 'Limpieza Sendero El Mirador',
    description: 'Jornada mensual de limpieza y mantenimiento del sendero principal que conduce al mirador panorámico.',
    location: 'Sendero El Mirador',
    status: 'active',
    progress: 80,
    startDate: 'Marzo 2024',
  },
  {
    id: '3',
    title: 'Restauración Quebrada Los Pinos',
    description: 'Proyecto de restauración ecológica de la quebrada, incluyendo limpieza y siembra de vegetación ribereña.',
    location: 'Quebrada Los Pinos',
    status: 'completed',
    progress: 100,
    startDate: 'Septiembre 2023',
  },
  {
    id: '4',
    title: 'Jardín de Mariposas',
    description: 'Creación de un jardín con plantas nativas para atraer y conservar especies de mariposas locales.',
    location: 'Parque Central',
    status: 'planned',
    progress: 15,
    startDate: 'Junio 2024',
  },
  {
    id: '5',
    title: 'Sendero Educativo',
    description: 'Construcción de un sendero interpretativo con señalización sobre la flora y fauna nativa.',
    location: 'Reserva Natural',
    status: 'active',
    progress: 45,
    startDate: 'Febrero 2024',
  },
  {
    id: '6',
    title: 'Monitoreo de Aves',
    description: 'Programa de monitoreo y registro de especies de aves para evaluar la salud del ecosistema.',
    location: 'Toda la región',
    status: 'active',
    progress: 55,
    startDate: 'Enero 2024',
  },
];

export const PROJECT_STATS_DATA = [
  { month: 'Ene', proyectos: 3 },
  { month: 'Feb', proyectos: 4 },
  { month: 'Mar', proyectos: 5 },
  { month: 'Abr', proyectos: 6 },
  { month: 'May', proyectos: 5 },
  { month: 'Jun', proyectos: 6 },
];
