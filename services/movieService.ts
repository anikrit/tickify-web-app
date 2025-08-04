import { API_BASE_URL } from "@/helpers/common.helper";
import { MovieResponse } from "@/types/movie.types";
import { APIClient } from "./apiClient";

class MovieService extends APIClient {
  constructor() {
    super(API_BASE_URL);
  }

  async getMovies(params: { page: number; limit: number }) {
    return this.get<MovieResponse>(`/api/movies`, { params }).then(
      (response) => response.data,
    );
  }
}

export const movieService = new MovieService();
