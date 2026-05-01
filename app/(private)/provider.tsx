"use client";
import { ReactNode } from "react"; 
import { RouteGuardProvider } from "@/src/permissions";
import { ThemeProvider } from "next-themes";

type Props = {
  children: ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RouteGuardProvider>
        {children}
      </RouteGuardProvider>
    </ThemeProvider>
  );
};

export default Provider;
