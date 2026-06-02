import { useQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';
// import { movieService } from '@/services/movieService';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const usePopularMovies = (page: number = 1) => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => movieService.getPopularMovies(page),
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => movieService.getNowPlayingMovies(page),
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.details(id),
    queryFn: () => movieService.getMovieDetails(id),
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn: () => movieService.searchMovies(query, page),
    enabled: !!query,
  });
};

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => movieService.getMovieCredits(id),
    enabled: !!id,
  });
};

export const useMovieVideos = (id: number) => {
  return useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => movieService.getMovieVideos(id),
    enabled: !!id,
  });
};