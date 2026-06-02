import { create } from 'zustand';
import type { Movie } from '@/types/movie';

// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  favorites: Movie[];

  // TODO: Add action methods
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

export const useMovieStore = create<MovieStore>((set, get) => ({
  // TODO: Initialize state and implement actions
  favorites: JSON.parse(localStorage.getItem('movie-favorites') ?? '[]'),

  addToFavorites: (movie) => {
    const updated = [...get().favorites, movie];
    localStorage.setItem('movie-favorites', JSON.stringify(updated));
    set({ favorites: updated });
  },

  removeFromFavorites: (movieId) => {
    const updated = get().favorites.filter((m) => m.id !== movieId);
    localStorage.setItem('movie-favorites', JSON.stringify(updated));
    set({ favorites: updated });
  },

  isFavorite: (movieId) => {
    return get().favorites.some((m) => m.id === movieId);
  },
}));