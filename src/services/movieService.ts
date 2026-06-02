import api from '@/lib/axios';
import type { MovieResponse, MovieDetail, Credits, VideoResponse } from '@/types/movie';


// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  },
  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    });
    return response.data;
  },
  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  getMovieDetails: async (id: number): Promise<MovieDetail> => {
    const response = await api.get<MovieDetail>(`/movie/${id}`);
    return response.data;
  },
  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const response = await api.get<MovieResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  },
  // TODO: Add more endpoints as needed
 getMovieCredits: async (id: number): Promise<Credits> => {
    const response = await api.get<Credits>(`/movie/${id}/credits`);
    return response.data;
  },

  getMovieVideos: async (id: number): Promise<VideoResponse> => {
    const response = await api.get<VideoResponse>(`/movie/${id}/videos`);
    return response.data;
  },
};
