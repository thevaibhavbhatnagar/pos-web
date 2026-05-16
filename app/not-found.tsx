"use client";

import Button from '@/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="relative flex justify-center">
          <div className="absolute inset-0 blur-3xl bg-blue-500/10 dark:bg-blue-500/5 rounded-full" />
          <div className="relative p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-zinc-800">
            <FileQuestion className="w-16 h-16 text-blue-500" />
          </div>
        </div>
        
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <Link href="/">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              startIcon={Home}
              variant="primary"
            >
              Back to Dashboard
            </Button>
          </Link>
          <Link href="javascript:history.back()">
            <Button
              className="w-full text-gray-500 dark:text-zinc-400 font-medium h-12 rounded-xl"
              startIcon={ArrowLeft}
              variant="ghost"
            >
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
