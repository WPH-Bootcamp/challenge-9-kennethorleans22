import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add utility functions for image URLs
// Hint: TMDB returns relative paths, you need to construct full image URLs
// Reference: https://developer.themoviedb.org/docs/image-basics

export function getImageUrl(path: string | null, size: string = 'original'): string {
  // TODO: Implement image URL construction
  // Use VITE_TMDB_IMAGE_BASE_URL from environment variables
   if (!path) return '/movie-poster-credits-178.jpg';
  return `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

// TODO: Add more utility functions as needed
// Examples: formatDate, formatRuntime, etc.
export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'Unknown';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}