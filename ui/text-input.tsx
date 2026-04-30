"use client";

import React from "react";
import {
  TextField,
  Input,
  Label,
  FieldError,
} from "@heroui/react";

interface TextInputProps {
  id?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  error?: boolean;
  errorMessage?: string;

  className?: string;
  labelClassName?: string;
  inputClassName?: string;

  maxLength?: number;

  disable?: boolean;
  required?: boolean;

  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

  readOnly?: boolean;
  variant?: "primary" | "secondary"
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,

  error = false,
  errorMessage = "",

  className = "w-full",
  labelClassName = "text-primary-foreground font-normal",
  inputClassName = "rounded-md border border-grey-200",

  maxLength,

  disable,
  required = true,

  readOnly = false,
  variant = "primary"
}) => {
  return (
    <TextField
      isInvalid={error}
      className={className}
      name={name}
      type={type}
    >
      {label && (
        <Label htmlFor={id} className={labelClassName}>
          {label} {required && <span className="text-danger">*</span>}
        </Label>
      )}

      <Input
        id={id}
        placeholder={placeholder}
        value={value?.toString() || ""}
        onChange={onChange}
        disabled={disable}
        readOnly={readOnly}
        maxLength={type !== "number" ? maxLength : undefined}
        className={inputClassName}
        variant={variant}
      />

      {error && errorMessage && (
        <FieldError>{errorMessage}</FieldError>
      )}
    </TextField>
  );
};

export default TextInput;