"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: (query) => {
              const hasData = query.state.data !== undefined;
              const lastFetch = query.state.dataUpdatedAt;
              const isStale = Date.now() - lastFetch > 60 * 1000;
              return hasData && isStale;
            },
            gcTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
