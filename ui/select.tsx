"use client";

import React from "react";
import { Select, Label, FieldError } from "@heroui/react";
import { getIn } from "formik";

interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  formik: any;

  variant?: "primary" | "secondary";
  fullWidth?: boolean;

  isRequired?: boolean;
  isDisabled?: boolean;

  onChange?: (value: string) => void;
}

const SelectField: React.FC<Props> = ({
  name,
  label,
  placeholder = "Select...",
  options,
  formik,

  variant = "primary",
  fullWidth = true,

  isRequired = false,
  isDisabled = false,

  onChange,
}) => {
  const value = getIn(formik.values, name) || "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  const hasError = touched && !!error;

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <Label>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Select
        items={options as any} // ✅ FIX: force iterable type mismatch
        selectionMode="single"
        variant={variant}
        fullWidth={fullWidth}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isRequired={isRequired}
        selectedKey={value || null}
        onSelectionChange={(key: any) => {
          const newValue = key ?? "";
          formik.setFieldValue(name, newValue);
          onChange?.(newValue);
        }}
      />

      {hasError && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default SelectField;
