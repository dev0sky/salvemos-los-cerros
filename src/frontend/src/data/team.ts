import type { TeamMemberData, PieChartData } from '@/types';

export const MOCK_TEAM_MEMBERS: TeamMemberData[] = [
  {
    id: '1',
    name: 'María González',
    role: 'Directora de Conservación',
    bio: 'Bióloga especializada en ecosistemas montañosos con 15 años de experiencia.',
    email: 'maria@naturalezaviva.org',
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    role: 'Coordinador de Voluntarios',
    bio: 'Apasionado por la educación ambiental y la participación comunitaria.',
    email: 'carlos@naturalezaviva.org',
  },
  {
    id: '3',
    name: 'Ana Martínez',
    role: 'Especialista en Reforestación',
    bio: 'Ingeniera forestal dedicada a la restauración de ecosistemas nativos.',
    email: 'ana@naturalezaviva.org',
  },
  {
    id: '4',
    name: 'Luis Torres',
    role: 'Educador Ambiental',
    bio: 'Maestro comprometido con la formación de nuevas generaciones conscientes.',
    email: 'luis@naturalezaviva.org',
  },
];

export const IMPACT_DATA: PieChartData[] = [
  { id: 'arboles', label: 'Árboles Plantados', value: 2500 },
  { id: 'voluntarios', label: 'Voluntarios Activos', value: 150 },
  { id: 'hectareas', label: 'Hectáreas Protegidas', value: 45 },
];
