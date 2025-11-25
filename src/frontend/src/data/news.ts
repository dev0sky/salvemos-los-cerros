import type { NewsArticle } from '@/types';

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'Exitosa Jornada de Reforestación en Cerro Grande',
    excerpt: 'Más de 50 voluntarios participaron en la plantación de 300 árboles nativos, superando nuestra meta inicial.',
    category: 'conservation',
    date: '2024-11-20',
    author: 'María González',
    featured: true,
  },
  {
    id: '2',
    title: 'Nuevo Taller de Educación Ambiental para Niños',
    excerpt: 'Lanzamos un programa educativo dirigido a escuelas primarias para fomentar el amor por la naturaleza.',
    category: 'education',
    date: '2024-11-18',
    author: 'Luis Torres',
  },
  {
    id: '3',
    title: 'Limpieza Masiva Recolecta 500kg de Residuos',
    excerpt: 'La comunidad se unió para limpiar el Sendero El Mirador, recolectando media tonelada de basura.',
    category: 'events',
    date: '2024-11-15',
    author: 'Carlos Ramírez',
  },
  {
    id: '4',
    title: 'Descubren Nueva Especie de Mariposa en la Reserva',
    excerpt: 'Investigadores identifican una especie de mariposa no documentada previamente en nuestra región.',
    category: 'conservation',
    date: '2024-11-10',
    author: 'Ana Martínez',
    featured: true,
  },
  {
    id: '5',
    title: 'Alianza con Universidad para Monitoreo Ecológico',
    excerpt: 'Firmamos convenio con la universidad local para estudios de biodiversidad a largo plazo.',
    category: 'conservation',
    date: '2024-11-05',
    author: 'María González',
  },
  {
    id: '6',
    title: 'Taller de Compostaje Atrae a 40 Participantes',
    excerpt: 'Gran éxito del taller sobre técnicas de compostaje casero y reducción de residuos orgánicos.',
    category: 'education',
    date: '2024-11-01',
    author: 'Luis Torres',
  },
];
