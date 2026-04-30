"use client";

import { ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {

  // QueryClient must be stable (DON’T create new QueryClient on every render)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60 * 1000, // 1 min
            gcTime: 10 * 60 * 1000, // 10 min (TanStack v5)
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      })
  );

  return (

    <SessionProvider>
      <QueryClientProvider client={queryClient}>      
        {children}
        <ToastProvider placement="top end"/> 
      </QueryClientProvider>
    </SessionProvider>
  )
}
