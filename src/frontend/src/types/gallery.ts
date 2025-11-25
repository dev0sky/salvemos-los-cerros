export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'project' | 'event' | 'nature' | 'team';
  date: string;
  photographer?: string;
  tags: string[];
}
