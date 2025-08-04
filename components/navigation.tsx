"use client";

import { useLogout, useMe } from "@/hooks/api/useAuth";
import { Film, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Navigation() {
  // Hooks
  const router = useRouter();

  const { data } = useMe();
  const { mutate } = useLogout();

  // Local States
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/home"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold">Tickify</span>
            </div>
          </Link>
          {/* Desktop Navigations*/}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/movies"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/my-bookings"
              className="text-gray-300 hover:text-white transition-colors"
            >
              My Bookings
            </Link>
          </div>
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {data?.user ? (
              <>
                <span className="text-sm text-gray-300">
                  Hi, {data.user.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={async () => {
                    mutate();
                    window.location.reload();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  onClick={() => router.push("/login")}
                >
                  <User className="w-4 h-4" />
                  Sign In
                </Button>
                <Button size="sm" onClick={() => router.push("/register")}>
                  Get Started
                </Button>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/movies"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Movies
              </Link>
              <Link
                href="/my-bookings"
                className="text-gray-300 hover:text-white transition-colors"
              >
                My Bookings
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="ghost" className="justify-start text-gray-300">
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
                <Button className="justify-start">Get Started</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
