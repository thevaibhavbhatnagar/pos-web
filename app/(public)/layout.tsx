import { ChartPie } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex overflow-y-auto h-screen w-full">
      {/* Left Side - Branding (Desktop only) */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-white dark:bg-zinc-900 border-r border-slate-200 dark:border-zinc-800">
        {/* Abstract Background Shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />

        <div className="relative z-10 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="bg-primary p-2.5 rounded-xl shadow-lg shadow-primary/30">
            <ChartPie className="text-primary-foreground" size={28} />
          </div>
          <Link href="/" className="text-2xl font-bold tracking-tight">
            DashFlow
          </Link>
        </div>

        <div className="relative z-10 max-w-lg animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 tracking-tight text-slate-900 dark:text-white">
            Smart POS <br/>
            Management <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              for Modern Businesses
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Streamline your sales, inventory, and operations with our elegant, powerful dashboard built for growth and reliability.
          </p>
        </div>
        
        <div className="relative z-10 text-sm font-medium text-slate-500 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          © {new Date().getFullYear()} DashFlow Inc. All rights reserved.
        </div>
      </div>

      {/* Right Side - Auth Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
        <div className="w-full max-w-[480px]">
          {children}
        </div>
      </div>
    </div>
  );
}
