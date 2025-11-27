import { useQuery } from '@tanstack/react-query';
import { getProjects, getEvents, getNews, getTeam, getGallery, getCerros, getCerroById, getStatistics } from '@/services/data';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
};

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
};

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: getNews,
  });
};

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: getTeam,
  });
};

export const useGallery = () => {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: getGallery,
  });
};

export const useCerros = () => {
  return useQuery({
    queryKey: ['cerros'],
    queryFn: getCerros,
  });
};

export const useCerro = (id: string | null) => {
  return useQuery({
    queryKey: ['cerro', id],
    queryFn: () => getCerroById(id!),
    enabled: !!id,
  });
};

export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: () => getStatistics(),
  });
};

