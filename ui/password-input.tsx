"use client";

import React, { useState, memo } from "react";
import {
  TextField,
  Input,
  Label,
  FieldError,
} from "@heroui/react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  id?: string;
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: boolean;
  errorMessage?: string;

  className?: string;
  labelClassName?: string;
  inputClassName?: string;

  required?: boolean;
  readOnly?:boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  startContent?: React.ReactNode;
  autoFocus?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder = "Enter password",

  error = false,
  errorMessage = "",

  className = "w-full",
  labelClassName = "text-primary-foreground font-normal",
  inputClassName = "rounded-lg border border-slate-200 focus-within:ring-2 focus-within:ring-yellow-400 focus-within:border-yellow-400 transition-all",

  required = true,
  disabled = false,
  readOnly = false,
  variant="primary",
  startContent,
  autoFocus = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      isInvalid={error}
      className={className}
      name={name}
      type={showPassword ? "text" : "password"}
    >
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <div className="relative w-full">
        {startContent && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
            {startContent}
          </div>
        )}
        <Input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          className={`w-full ${startContent ? 'pl-10' : ''} pr-10 ${inputClassName}`}
          variant={variant}          
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-grey"
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
        >
          {showPassword ? (
            <Eye className="w-4 h-4" />
          ) : (
            <EyeOff className="w-4 h-4" />
          )}
        </button>
      </div>

      {error && errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </TextField>
  );
};

export default memo(PasswordInput);