"use client";

import React, { ReactNode } from "react";
import { Button as HeroButton } from "@heroui/react";
import { LucideIcon } from "lucide-react";

interface Props {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onClick?: () => void;
  className?: string;
  type?: "submit" | "button" | "reset";
  variant?:
    | "primary"
    | "secondary" 
    | "tertiary"
    | "ghost"
    | "outline"
    | "danger"
    | "danger-soft";
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  className = "w-full rounded-lg font-normal",
  size = "sm",
  startIcon: StartIcon,
  endIcon: EndIcon,
  onClick,
  type = "submit",
  variant = "ghost",
  disabled = false,
}) => {
  return (
    <HeroButton
      type={type}
      onPress={onClick}
      className={`font-semibold shadow-lg bg-[image:var(--sidebar-active-bg)] backdrop-blur-md border border-[var(--sidebar-active-border)] shadow-[inset_0px_1px_1px_var(--sidebar-active-highlight)] text-[var(--sidebar-active-text)]  hover:opacity-100 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${className}`}
      size={size}
      variant={variant}
      isDisabled={disabled}
    >
      <span className="flex items-center justify-center gap-2">
        {StartIcon && <StartIcon className="w-4 h-4" />}
        {children}
        {EndIcon && <EndIcon className="w-4 h-4" />}
      </span>
    </HeroButton>
  );
};

export default Button;
