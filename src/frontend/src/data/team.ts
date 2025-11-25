import type { TeamMemberData, PieChartData } from '@/types';

export const MOCK_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: '1',
    name: 'Luis Andrés Rivera Lebario',
    role: 'Vocero del Colectivo',
    bio: 'Activista ambiental y vocero principal de Salvemos los Cerros. Lidera iniciativas de protección y restauración de áreas naturales en Chihuahua.',
    email: 'contacto@salvemosloscerros.org',
  },
  {
    id: '2',
    name: 'Santiago de la Peña Grajeda',
    role: 'Coordinador de Proyectos',
    bio: 'Especialista en gestión de proyectos ambientales y coordinación de actividades comunitarias del colectivo.',
    email: 'proyectos@salvemosloscerros.org',
  },
  {
    id: '3',
    name: 'Alondra Martínez Ayón',
    role: 'Directora del Instituto Municipal de Planeación Integral',
    bio: 'Colaboradora institucional en la planeación urbana sostenible y protección de áreas naturales.',
    email: 'alondra.martinez@chihuahua.gob.mx',
  },
  {
    id: '4',
    name: 'María Luisa Bustillos Gardea',
    role: 'Activista Premiada',
    bio: 'Activista reconocida con el Premio Anual a la Participación Ciudadana "Paquita Jiménez" junto con el colectivo.',
    email: 'maria.bustillos@salvemosloscerros.org',
  },
];

export const IMPACT_DATA: PieChartData[] = [
  { id: 'audiencias', label: 'Audiencias Públicas', value: 5 },
  { id: 'proyectos', label: 'Proyectos Activos', value: 6 },
  { id: 'eventos', label: 'Eventos Realizados', value: 15 },
  { id: 'cerros', label: 'Cerros en Protección', value: 4 },
];
