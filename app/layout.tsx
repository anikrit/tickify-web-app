import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tickify",
  description: "Online Movie Ticket Booking Platform",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Don't auto-retry failed queries
      refetchOnWindowFocus: (query) => {
        // Only refetch if last fetch is older than 60s
        const hasData = query.state.data !== undefined;
        const lastFetch = query.state.dataUpdatedAt;
        const isStale = Date.now() - lastFetch > 60 * 1000;
        return hasData && isStale;
      },
      gcTime: 60 * 1000, // Keep unused queries in cache for 60s
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
