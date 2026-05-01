import React from 'react'

import NavBar from "@/ui/nav-bar";

import Provider from '@/app/(private)/provider';

import { AppSidebar } from "@/app/(private)/_components/sidebar/app-sidebar";
import { SidebarProvider } from "@/app/(private)/_components/sidebar/sidebar";
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col overflow-x-auto bg-grey-200">
          {/* <NavBar /> */}
          <div className="px-6">{children}</div>
        </main>
      </SidebarProvider>
    </Provider>
  );
}