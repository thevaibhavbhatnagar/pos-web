// ui/select.tsx
"use client";

import React from "react";
import {
  Autocomplete,
  Label,
  FieldError,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";
import { FormikProps, getIn } from "formik";

export interface Option {
  label: string;
  value: string;
}

interface Props<T extends Record<string, any>> {
  name: keyof T & string;
  label?: string;
  placeholder?: string;
  options: Option[];
  formik: FormikProps<T>;

  variant?: "primary" | "secondary";
  fullWidth?: boolean;

  isRequired?: boolean;
  isDisabled?: boolean;

  onChange?: (value: string) => void;
  labelClassName?: string;
  autoFocus?: boolean;
}

export default function SelectField<T extends Record<string, any>>({
  name,
  label,
  placeholder = "Select...",
  options,
  formik,
  variant = "primary",
  fullWidth = true,
  isRequired = false,
  isDisabled = false,
  labelClassName = "text-primary-foreground font-normal",
  onChange,
  autoFocus = false,
}: Props<T>) {
  const value = (getIn(formik.values, name) as string) || "";
  const error = getIn(formik.errors, name) as string | undefined;
  const touched = getIn(formik.touched, name) as boolean | undefined;

  // Show error on submit or when touched
  const hasError = Boolean((formik.submitCount > 0 || touched) && error);

  const { contains } = useFilter({ sensitivity: "base" });

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <Label className={labelClassName}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Autocomplete<Option, "single">
        items={options as unknown as Iterable<Option>}
        value={value || null}                 // ✅ NEW
        onChange={(key) => {                  // ✅ NEW
          const newValue = key ? String(key) : "";
          formik.setFieldValue(name, newValue);
          formik.setFieldTouched(name, true);
          onChange?.(newValue);
        }}
        isInvalid={hasError}
        isRequired={isRequired}
        isDisabled={isDisabled}
        variant={variant}
        fullWidth={fullWidth}
        onBlur={() => formik.setFieldTouched(name, true)}
        placeholder={placeholder}
        autoFocus={autoFocus}
      >
        <Autocomplete.Trigger className="rounded-lg border-slate-200 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>

        <Autocomplete.Popover className="z-[9999] bg-white dark:bg-zinc-900 border shadow-xl rounded-xl overflow-hidden">
          <Autocomplete.Filter filter={contains}>
            <div className="p-2 border-b">
              <SearchField variant="secondary">
                <SearchField.Group>
                  <SearchField.SearchIcon />
                  <SearchField.Input placeholder="Search..." />
                  <SearchField.ClearButton />
                </SearchField.Group>
              </SearchField>
            </div>

            <ListBox>
              {options.map((item) => (
                <ListBox.Item
                  key={item.value}
                  id={item.value}
                  textValue={item.label}
                >
                  {item.label}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>

        {/* HeroUI FieldError works when you pass children */}
        <FieldError>{hasError ? error : null}</FieldError>
      </Autocomplete>
    </div >
  );
}