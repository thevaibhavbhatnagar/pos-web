"use client";

import React, { ReactNode } from "react";
import { Button } from "@heroui/react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
}

const variantStyles = {
  primary:
    "bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)] hover:opacity-90",

  secondary:
    "bg-default-100 text-surface border border-default-200 hover:bg-default-200",

  danger: "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 hover:border-rose-300",
  ghost: ""
};

const HeroButton: React.FC<Props> = ({
  children,
  className,
  size = "sm",
  startIcon: StartIcon,
  endIcon: EndIcon,
  onClick,
  type = "submit",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      size={size}
      variant="ghost"
      isDisabled={disabled}
      className={clsx(
        "rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]",
        variantStyles[variant],
        className
      )}
    >
      <span className="flex items-center justify-center gap-2">
        {StartIcon && <StartIcon className="w-4 h-4" />}
        {children}
        {EndIcon && <EndIcon className="w-4 h-4" />}
      </span>
    </Button>
  );
};

export default HeroButton;