"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  Button,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import { User, LogOut, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

import Modal from "./modal";

const NavBar = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = React.useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onOpenChange = (open: boolean) => setIsOpen(open);

  const handleLogout = async () => {
    await signOut({ redirect: false });

    router.push("/auth/login");
    router.refresh();
  };

  return (
    <div className="flex w-full items-center justify-between bg-content1 py-[0.12rem] sticky top-0 z-50 border-b border-divider">
      {/* Left */}
      <div className="py-3 flex items-center px-6">
        <Link href="/dashboard" className="font-semibold text-foreground">
          Home
        </Link>
      </div>

      {/* Right */}
      <div className="px-6 flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          isIconOnly
          variant="ghost"
          className="rounded-full"
          onPress={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-warning" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </Button>

        {/* Profile Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="ghost" className="rounded-full">
              <User className="w-5 h-5 text-primary" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Profile Actions"
            onAction={(key) => {
              if (key === "logout") onOpen();
            }}
          >
            <DropdownItem key="logout">
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Logout Modal */}
      <Modal
        title=""
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        footerActions={[
          {
            label: "Cancel",
            variant: "ghost",
            onPress: onClose,
          },
          {
            label: "Confirm",
            variant: "primary",
            onPress: handleLogout,
          },
        ]}
      >
        <div className="flex flex-col items-center justify-center gap-3 py-2">
          <LogOut className="w-10 h-10 text-primary" />

          <p className="text-center font-medium text-lg">
            Are you sure you want to log out?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default NavBar;
