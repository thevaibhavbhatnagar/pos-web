"use client";

import React from "react";
import { TextArea, Label, FieldError } from "@heroui/react";

interface TextAreaProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  value: string | number;

  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  error?: boolean;
  errorMessage?: string;

  className?: string;

  maxLength?: number;

  labelClassName?: string;

  disabled?: boolean;
  required?: boolean;

  readOnly?: boolean;

  rows?: number;
}

const TextAreaField: React.FC<TextAreaProps> = ({
  id,
  label,
  name,
  placeholder = "",
  value,

  onChange,

  error = false,
  errorMessage = "",

  className = "w-full flex flex-col gap-1",

  maxLength,

  labelClassName,

  disabled,
  required = false,

  readOnly = false,
  rows = 4,
}) => {
  const hasError = error && !!errorMessage;

  return (
    <div className={className}>
      {label && (
        <Label className={labelClassName}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <TextArea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value?.toString() || ""}
        onChange={onChange}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        readOnly={readOnly}
        className="w-full rounded-2xl border border-border bg-white dark:bg-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {hasError && <FieldError>{errorMessage}</FieldError>}
    </div>
  );
};

export default TextAreaField;
