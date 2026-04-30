"use client";

import { Label } from "@heroui/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");

      if (
        (isMac ? e.metaKey : e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "d"
      ) {
        e.preventDefault();

        const current = theme === "system" ? systemTheme : theme;
        setTheme(current === "dark" ? "light" : "dark");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme, systemTheme, setTheme]);

  if (!mounted) return null;

  const current = theme === "system" ? systemTheme : theme;

  return (
    <div  
      className="rounded-full w-full flex justify-start"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
    >
      {current === "dark" ? (
        <div className="flex items-center gap-2">
          <SunIcon className="w-4 h-4" />
          <Label className="text-sm font-medium">Theme</Label>
        </div>
      ) : ( 
        <div className="flex items-center gap-2">
          <MoonIcon className="w-4 h-4" />
          <Label className="text-sm font-medium">Theme</Label>
        </div>
      )}
    </div>
  );
}