import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

type Movie = {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  poster: string;
  description: string;
  showtimes: string[];
  theaters: string[];
};

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Card
      key={movie.id}
      className="p-0 gap-0 flex flex-col overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      // onClick={() => handleMovieSelect(movie)}
    >
      <div className="aspect-[3/4] relative">
        <Image
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-col flex-1 p-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{movie.rating}</span>
            <Badge variant="secondary" className="text-xs">
              {movie.duration}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{movie.genre}</p>
        </div>
        <div className="mt-auto">
          <Button className="w-full">Book Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
