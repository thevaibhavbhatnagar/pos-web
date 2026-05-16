"use client";

import { ToastProvider, toast } from "@heroui/react";
import { QueryCache, MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { handleAxiosError } from "@/utils/axiosInstance";

export default function Providers({ children }: { children: React.ReactNode }) {

  // QueryClient must be stable (DON’T create new QueryClient on every render)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            toast.danger(`Connection Error: ${handleAxiosError(error)}`);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error) => {
            toast.danger(`Action Failed: ${handleAxiosError(error)}`);
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 60 * 1000, // 1 min
            gcTime: 10 * 60 * 1000, // 10 min (TanStack v5)
            refetchOnWindowFocus: false,
            // Automatically trigger error.tsx if a query fails due to a Network Error
            throwOnError: (error: any) => {
               return !error.response || error.message?.includes('Network Error');
            },
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
