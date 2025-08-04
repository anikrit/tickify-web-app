import { movieService } from "@/services/movieService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useMovies = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["movies", { page, limit }],
    queryFn: () =>
      movieService.getMovies({
        page,
        limit,
      }),
    placeholderData: keepPreviousData,
  });
};
