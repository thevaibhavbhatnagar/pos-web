'use client';

import { useEffect } from 'react';
import Button from '@/ui/button';
import { AlertCircle, RefreshCw, Home, WifiOff } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error);
  }, [error]);

  // Detect if this is a network/connection error
  const isNetworkError =
    error.message?.toLowerCase().includes('network error') ||
    error.message?.toLowerCase().includes('failed to fetch') ||
    error.message?.toLowerCase().includes('unreachable') ||
    !navigator.onLine;

  if (isNetworkError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
        <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
          <div className="flex justify-center">
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-full">
              <WifiOff className="w-12 h-12 text-orange-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Connection Lost
            </h1>
            <p className="text-gray-500 dark:text-zinc-400">
              We're unable to reach the backend server. Please check your internet connection or try again later.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={reset}
              className="flex-1"
              startIcon={RefreshCw}
              variant="danger"
            >
              Retry
            </Button>
            <Link href="/" className="flex-1">
              <Button
                variant="primary"
                startIcon={Home}
              >
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800">
        <div className="flex justify-center">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="text-gray-500 dark:text-zinc-400">
            An unexpected error occurred while rendering this page. We've been notified and are looking into it.
          </p>
        </div>

        {error.message && (
          <div className="p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-xl text-left">
            <p className="text-xs font-mono text-gray-400 uppercase mb-1">Error Details</p>
            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={reset}
            className="flex-1"
            startIcon={RefreshCw}
            variant="danger"
          >
            Try again
          </Button>
          <Link href="/" className="flex-1">
            <Button
              variant="primary"
              startIcon={Home}
            >
              Go home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
