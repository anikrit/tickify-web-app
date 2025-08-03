"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Calendar, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface MovieDetailsProps {
  movie: {
    id: number;
    title: string;
    genre: string;
    duration: string;
    rating: number;
    poster: string;
    description: string;
    showtimes: string[];
    theaters: string[];
  };
  onShowtimeSelect: (showtime: string, theater: string) => void;
  onBack: () => void;
}

const movie = {
  id: "1",
  title: "Guardians of the Galaxy Vol. 3",
  genre: "Action, Adventure, Comedy",
  duration: "2h 30m",
  rating: 8.2,
  poster: "/placeholder.svg?height=400&width=300&text=Guardians+3",
  description:
    "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and one of their own.",
  showtimes: ["10:00 AM", "1:30 PM", "4:45 PM", "8:00 PM", "10:30 PM"],
  theaters: ["AMC Empire 25", "Regal Union Square", "Cinemark Downtown"],
};

export default function SingleMoviePage() {
  // Hooks
  const router = useRouter();

  // Local States
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");

  const handleContinue = () => {
    if (selectedShowtime && selectedTheater) {
    }
  };

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        onClick={() => router.push("/movies")}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movies
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
            <Image
              src={movie.poster || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{movie.rating}</span>
              </div>
              <Badge variant="secondary">{movie.duration}</Badge>
              <span className="text-muted-foreground">{movie.genre}</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {movie.description}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Select Showtime
              </CardTitle>
              <CardDescription>
                Choose your preferred theater and showtime
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Theater
                </label>
                <Select
                  value={selectedTheater}
                  onValueChange={setSelectedTheater}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a theater" />
                  </SelectTrigger>
                  <SelectContent>
                    {movie.theaters.map((theater) => (
                      <SelectItem key={theater} value={theater}>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {theater}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedTheater && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Showtime
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {movie.showtimes.map((time) => (
                      <Button
                        key={time}
                        variant={
                          selectedShowtime === time ? "default" : "outline"
                        }
                        onClick={() => setSelectedShowtime(time)}
                        className="justify-start"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTheater && selectedShowtime && (
                <div className="pt-4">
                  <Button onClick={handleContinue} className="w-full" size="lg">
                    Continue to Seat Selection
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
