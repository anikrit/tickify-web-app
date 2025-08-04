"use client";

import MovieCard from "@/components/movie-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMovies } from "@/hooks/api/useMovie";
import movies from "@/public/data/movies.json";
import { useState } from "react";

export default function MoviesPage() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<string>("8");

  const { data } = useMovies(page, Number(pageSize));

  return (
    <>
      <div className="flex justify-between mt-4 mb-6 mx-4 space-x-2">
        <div>
          <Select value={pageSize} onValueChange={setPageSize}>
            <SelectTrigger>
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="16">16</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-x-2">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <Button
            disabled={page * Number(pageSize) >= movies.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data &&
          data.movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </>
  );
}
