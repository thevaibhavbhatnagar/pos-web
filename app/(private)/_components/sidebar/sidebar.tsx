"use client"
import React, { createContext, useContext, useState, HTMLAttributes, useEffect } from "react";
import { cn } from "@heroui/react";

type SidebarContextProps = {
  open: boolean;
  toggle: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);

  // auto collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
      else setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // initialize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setOpen((prev) => !prev);

  //  ONLY Ctrl + B toggles sidebar
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isCtrlB =
        e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey &&
        e.key.toLowerCase() === "b";

      if (!isCtrlB) return;

      e.preventDefault();
      toggle();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <SidebarContext.Provider value={{ open, toggle }}>
      <div className="flex h-screen w-full overflow-x-auto">{children}</div>
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used inside SidebarProvider");
  return ctx;
};

// Add HTMLAttributes to allow className and other props
export const Sidebar = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLElement>) => {
  const { open } = useSidebar();
  return (
    <aside
      className={cn(
        "flex flex-col bg-content1 transition-all duration-300 ease-in-out",
        open ? "w-[14rem]" : "w-16",

        // open ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

export const SidebarHeader = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("sticky top-0 z-10 py-1.5 px-2 mb-2 bg-content1", className)}
    // className={cn("sticky top-0 z-10 border-b border-divider py-1.5 px-2 mb-2 bg-content1", className)}
    {...props}
  >
    {children}
  </div>
);

export const SidebarContent = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  const { open } = useSidebar();
  return (
    <div className={cn("flex-1 px-2 py-2", open ? "overflow-y-auto" : "overflow-visible", className)} {...props}>
      {children}
    </div>
  );
};

export const SidebarFooter = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("sticky bottom-0 border-t border-divider bg-content1 p-3", className)} {...props}>
    {children}
  </div>
);

export const SidebarTrigger = () => {
  const { toggle } = useSidebar();
  return (
    <button
      onClick={toggle}  className="m-2 rounded-lg border border-divider bg-content1 px-2 py-1 text-sm text-foreground hover:bg-content2 fixed left-42 top-2 z-50"

    >
      Toggle
    </button>
  );
};
