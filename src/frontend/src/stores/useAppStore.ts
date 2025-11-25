import { create } from 'zustand';

interface AppState {
  // Filters
  projectFilter: 'all' | 'active' | 'completed' | 'planned';
  eventFilter: 'all' | 'upcoming' | 'past';
  newsCategory: 'all' | 'conservation' | 'events' | 'education';
  
  // Actions
  setProjectFilter: (filter: AppState['projectFilter']) => void;
  setEventFilter: (filter: AppState['eventFilter']) => void;
  setNewsCategory: (category: AppState['newsCategory']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  projectFilter: 'all',
  eventFilter: 'all',
  newsCategory: 'all',
  
  // Actions
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  setEventFilter: (filter) => set({ eventFilter: filter }),
  setNewsCategory: (category) => set({ newsCategory: category }),
}));
