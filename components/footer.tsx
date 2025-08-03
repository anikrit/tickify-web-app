import { Film } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 text-center">
        <Link
          href="/home"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <Film className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold">Tickify</span>
          </div>
        </Link>
        <p className="text-muted-foreground">
          Your premium movie experience awaits. Book now and enjoy the magic of
          cinema.
        </p>
      </div>
    </footer>
  );
}
