"use client";

import { Button } from "@heroui/react";
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
    <Button
      isIconOnly 
      size="sm"
      className="rounded-full"
      onPress={() => setTheme(current === "dark" ? "light" : "dark")}
    >
      {current === "dark" ? (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      ) : (
        <MoonIcon className="w-5 h-5 text-primary" />
      )}
    </Button>
  );
}