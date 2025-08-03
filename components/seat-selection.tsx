"use client";

import { ArrowLeft, Users } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SeatSelectionProps {
  movie: {
    title: string;
  };
  showtime: string;
  theater: string;
  onSeatSelect: (seats: string[]) => void;
  onBack: () => void;
}

export function SeatSelection({
  movie,
  showtime,
  theater,
  onSeatSelect,
  onBack,
}: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat layout (simplified)
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;
  const occupiedSeats = [
    "A3",
    "A4",
    "B7",
    "C5",
    "C6",
    "D8",
    "E2",
    "F10",
    "G1",
    "G12",
  ];

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId],
    );
  };

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return "occupied";
    if (selectedSeats.includes(seatId)) return "selected";
    return "available";
  };

  const getSeatClassName = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-500 cursor-not-allowed";
      case "selected":
        return "bg-green-500 hover:bg-green-600";
      case "available":
        return "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";
      default:
        return "bg-gray-200";
    }
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      onSeatSelect(selectedSeats);
    }
  };

  const ticketPrice = 12.5;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="space-y-8">
      <Button variant="ghost" onClick={onBack} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Movie Details
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Select Your Seats</CardTitle>
              <CardDescription>
                {movie.title} • {showtime} • {theater}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Screen */}
              <div className="mb-8">
                <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 rounded-t-full mb-2"></div>
                <p className="text-center text-sm text-muted-foreground">
                  SCREEN
                </p>
              </div>

              {/* Seat Map */}
              <div className="space-y-2">
                {rows.map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    <div className="w-6 text-center font-medium text-sm">
                      {row}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seatNumber = i + 1;
                        const seatId = `${row}${seatNumber}`;
                        const status = getSeatStatus(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId)}
                            disabled={status === "occupied"}
                            className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-colors ${getSeatClassName(status)}`}
                            title={`Seat ${seatId} - ${status}`}
                          >
                            {seatNumber}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mt-8 pt-6 border-t">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-t"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-t"></div>
                  <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-t"></div>
                  <span className="text-sm">Occupied</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">{theater}</p>
                <p className="text-sm text-muted-foreground">{showtime}</p>
              </div>

              {selectedSeats.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Selected Seats</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedSeats.map((seat) => (
                      <Badge key={seat} variant="secondary">
                        {seat}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Tickets ({selectedSeats.length})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Booking Fee</span>
                  <span>$2.50</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${(totalPrice + 2.5).toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                className="w-full"
                size="lg"
                disabled={selectedSeats.length === 0}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
