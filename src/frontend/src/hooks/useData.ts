import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, getEvents, getNews, getTeam, getGallery, getCerros, getCerroById, getStatistics, getFAQs, getContributions, getComments, createComment } from '@/services/data';

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

export const useFAQs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: getFAQs,
  });
};

export const useContributions = () => {
  return useQuery({
    queryKey: ['contributions'],
    queryFn: getContributions,
  });
};

export const useComments = (params: { project?: string; event?: string; news?: string }) => {
  return useQuery({
    queryKey: ['comments', params],
    queryFn: () => getComments(params),
    enabled: !!(params.project || params.event || params.news),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      // Invalidate comments query to refetch
      const params: { project?: string; event?: string; news?: string } = {};
      if (variables.project) params.project = variables.project;
      if (variables.event) params.event = variables.event;
      if (variables.news_article) params.news = variables.news_article;
      
      queryClient.invalidateQueries({ queryKey: ['comments', params] });
    },
  });
};
