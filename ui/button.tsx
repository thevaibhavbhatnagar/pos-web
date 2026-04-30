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
  className = "w-full rounded-2xl font-normal",
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
      className={`bg-primary text-white hover:opacity-90 ${className}`}
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
