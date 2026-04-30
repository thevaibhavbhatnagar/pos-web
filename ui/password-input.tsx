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
  disabled?: boolean;
  readOnly?: boolean;
  variant?: "primary" | "secondary";
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
  inputClassName = "rounded-md border border-grey-200",

  required = true,
  disabled = false,
  readOnly = false,
  variant="primary"
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
        <Input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full pr-10 ${inputClassName}`}
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