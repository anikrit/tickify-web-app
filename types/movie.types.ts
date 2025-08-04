export type Movie = {
  id: number;
  title: string;
  description: string;
  genre: string;
  duration: string;
  rating: number;
  posterUrl: string;
};

export type MovieResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  movies: Movie[];
};
