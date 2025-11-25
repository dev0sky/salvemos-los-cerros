// Static Photos API configuration
const STATIC_PHOTOS_BASE_URL = 'https://static.photos';

/**
 * Get a random image URL from static.photos by topic
 * @param topic - The topic/keyword for the image
 * @param width - Image width (default: 800)
 * @param height - Image height (default: 600)
 * @returns Image URL
 */
export const getStaticPhoto = (
  topic: string,
  width: number = 800,
  height: number = 600
): string => {
  return `${STATIC_PHOTOS_BASE_URL}/${width}x${height}?${topic}`;
};

/**
 * Get a specific static.photos image by ID
 * @param imageId - Image ID
 * @param width - Image width
 * @param height - Image height
 * @returns Image URL
 */
export const getStaticPhotoById = (
  imageId: string,
  width: number = 800,
  height: number = 600
): string => {
  return `${STATIC_PHOTOS_BASE_URL}/${imageId}/${width}x${height}`;
};

// Predefined image topics for consistency
export const IMAGE_TOPICS = {
  NATURE: 'nature,forest,trees',
  CLEANUP: 'cleanup,environment,volunteer',
  REFORESTATION: 'planting,trees,forest',
  WORKSHOP: 'workshop,education,learning',
  CONSERVATION: 'conservation,wildlife,nature',
  COMMUNITY: 'community,people,volunteer',
  MOUNTAINS: 'mountains,landscape,nature',
  BIRDS: 'birds,wildlife,nature',
  TEAM: 'team,people,group',
  NEWS: 'news,environment,nature',
} as const;
