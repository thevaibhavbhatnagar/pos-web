"use client";

import Button from '@/ui/button';
import { WifiOff, RefreshCw, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export default function NetworkError() {
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
          <p className="text-gray-500 dark:text-zinc-400 text-balance">
            We're unable to reach our servers. This could be due to a network issue or the server being temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Link href="/">
            <Button
              className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold h-12 rounded-xl"
              startIcon={RefreshCw}
              variant="primary"
            >
              Retry Connection
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Link href="/support" className="flex-1">
              <Button
                variant="danger"
                className="w-full font-medium h-12 rounded-xl"
              >
                Contact Support
              </Button>
            </Link>
            <a href="tel:+1234567890">
              <Button
                variant="ghost"
                className="w-12 h-12 min-w-0 p-0 rounded-xl"
                startIcon={PhoneCall}
              >
                {""}
              </Button>
            </a>
          </div>
        </div>
        
        <p className="text-xs text-gray-400">
          Check your internet connection or try again later.
        </p>
      </div>
    </div>
  );
}
