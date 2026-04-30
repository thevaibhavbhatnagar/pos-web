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
  className = "w-full rounded-xl font-normal",
  size = "md",
  startIcon: StartIcon,
  endIcon: EndIcon,
  onClick,
  type = "submit",
  variant = "primary",
  disabled = false,
}) => {
  return (
    <HeroButton
      type={type}
      onPress={onClick}
      className={`bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:opacity-100 transform transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${className}`}
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
