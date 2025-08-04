"use client";

import { useMovies } from "@/hooks/api/useMovie";
import MovieCard from "../movie-card";

export default function NowShowing() {
  const { data } = useMovies(1, 4);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Now Showing</h2>
        <p className="text-muted-foreground">
          Choose from our latest movie selections
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data &&
          data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
}
