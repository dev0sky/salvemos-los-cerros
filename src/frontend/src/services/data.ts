import api from './api';
import type { Project, Event, NewsArticle, TeamMemberData, GalleryImage, Cerro, Statistics } from '@/types';

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/projects/');
  return response.data;
};

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get<Event[]>('/events/');
  return response.data;
};

export const getNews = async (): Promise<NewsArticle[]> => {
  const response = await api.get<NewsArticle[]>('/news/');
  return response.data;
};

export const getTeam = async (): Promise<TeamMemberData[]> => {
  const response = await api.get<TeamMemberData[]>('/team/');
  return response.data;
};

export const getGallery = async (): Promise<GalleryImage[]> => {
  const response = await api.get<GalleryImage[]>('/gallery/');
  return response.data;
};

export const getCerros = async (): Promise<Cerro[]> => {
  const response = await api.get<Cerro[]>('/cerros/');
  return response.data;
};

export const getCerroById = async (id: string): Promise<Cerro> => {
  const response = await api.get<Cerro>(`/cerros/${id}/`);
  return response.data;
};

export const getStatistics = async (): Promise<Statistics> => {
  const response = await api.get<Statistics>('/statistics/');
  return response.data;
};
