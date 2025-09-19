import { mockResponses } from './mockData';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Demo mode - using mock data instead of API calls
const USE_MOCK_DATA = false;

// Demo API key - replace with your actual TMDB API key
const API_KEY = '67b5b034cee79c1f2b04751e142caa5a'; // Replace with your TMDB read access token

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  homepage: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  spoken_languages: SpokenLanguage[];
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

class TMDBService {
  private async fetchFromTMDB<T>(endpoint: string): Promise<T> {
    // Use mock data in demo mode
    if (USE_MOCK_DATA) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return this.getMockData(endpoint);
    }

    const url = `${TMDB_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('TMDB API error:', error);
      throw error;
    }
  }

  private getMockData<T>(endpoint: string): T {
    if (endpoint.includes('/trending/movie/')) return mockResponses.trending as T;
    if (endpoint.includes('/movie/popular')) return mockResponses.popular as T;
    if (endpoint.includes('/movie/top_rated')) return mockResponses.topRated as T;
    if (endpoint.includes('/movie/now_playing')) return mockResponses.nowPlaying as T;
    if (endpoint.includes('/movie/upcoming')) return mockResponses.upcoming as T;
    if (endpoint.includes('/tv/popular')) return mockResponses.popularTV as T;
    if (endpoint.includes('/search/multi')) {
      const query = new URLSearchParams(endpoint.split('?')[1]).get('query') || '';
      return mockResponses.search(query) as T;
    }
    
    // Default fallback
    return mockResponses.popular as T;
  }

  // Movie endpoints
  async getTrendingMovies(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/trending/movie/${timeWindow}`);
  }

  async getPopularMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/popular?page=${page}`);
  }

  async getTopRatedMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/top_rated?page=${page}`);
  }

  async getNowPlayingMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/now_playing?page=${page}`);
  }

  async getUpcomingMovies(page = 1): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/upcoming?page=${page}`);
  }

  async getMovieCredits(id: number): Promise<{ cast: Cast[] }> {
    return this.fetchFromTMDB(`/movie/${id}/credits`);
  }

  async getMovieVideos(id: number): Promise<{ results: Video[] }> {
    return this.fetchFromTMDB(`/movie/${id}/videos`);
  }

  async getSimilarMovies(id: number): Promise<TMDBResponse<Movie>> {
    return this.fetchFromTMDB(`/movie/${id}/similar`);
  }

  // TV Show endpoints
  async getTrendingTVShows(timeWindow: 'day' | 'week' = 'week'): Promise<TMDBResponse<TVShow>> {
    return this.fetchFromTMDB(`/trending/tv/${timeWindow}`);
  }

  async getPopularTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetchFromTMDB(`/tv/popular?page=${page}`);
  }

  async getTopRatedTVShows(page = 1): Promise<TMDBResponse<TVShow>> {
    return this.fetchFromTMDB(`/tv/top_rated?page=${page}`);
  }

  // Search endpoints
  async searchMulti(query: string, page = 1): Promise<TMDBResponse<Movie | TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchFromTMDB(`/search/multi?query=${encodedQuery}&page=${page}`);
  }

  async searchMovies(query: string, page = 1): Promise<TMDBResponse<Movie>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchFromTMDB(`/search/movie?query=${encodedQuery}&page=${page}`);
  }

  async searchTVShows(query: string, page = 1): Promise<TMDBResponse<TVShow>> {
    const encodedQuery = encodeURIComponent(query);
    return this.fetchFromTMDB(`/search/tv?query=${encodedQuery}&page=${page}`);
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.fetchFromTMDB(`/movie/${id}?append_to_response=credits,videos`);
  }

  async getTVShowDetails(id: number): Promise<any> {
    return this.fetchFromTMDB(`/tv/${id}?append_to_response=credits,videos`);
  }

  // Utility methods for image URLs
  getImageURL(path: string | null, size: 'w154' | 'w342' | 'w500' | 'w780' | 'original' = 'w500'): string {
    if (!path) return '/placeholder.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }

  getBackdropURL(path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string {
    if (!path) return '/placeholder.svg';
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  }
}

export const tmdbService = new TMDBService();