import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

// TODO: Create axios instance with base configuration
// Hint: Use environment variables for API URL and API key
// Reference: https://axios-http.com/docs/instance

const api = axios.create({
  // TODO: Configure baseURL from environment variable
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
  // TODO: Add default headers (API key, content-type)
  headers: {
    'Content-Type': 'application/json',
  },
});

// TODO: Add request interceptor if needed
// Hint: You can add API key to every request here
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);
// TODO: Add response interceptor for error handling

export default api;
