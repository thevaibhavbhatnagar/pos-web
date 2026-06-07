"use client";

import React from "react";
import { Select, Label, ListBox, Chip, FieldError } from "@heroui/react";
import { getIn } from "formik";
import { X } from "lucide-react";

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  formik: any;
  variant?: "primary" | "secondary";
  labelClassName?: string;
  onChange?: (value: string[]) => void;
  required?: boolean;
  disable?: boolean;
}

const MultiSelect: React.FC<Props> = ({
  name,
  label,
  placeholder = "Select options",
  options,
  formik,
  variant = "primary",
  labelClassName = "text-fields-foreground font-normal",
  onChange,
  required = true,
  disable,
}) => {
  const selectedValues: string[] = getIn(formik.values, name) || [];
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  const handleSelectionChange = (keys: any) => {
    const values = keys === "all" ? options.map((o) => o.value) : Array.from(keys).map(String);
    formik.setFieldValue(name, values);
    onChange?.(values);
  };

  const handleRemove = (val: string) => {
    const updated = selectedValues.filter((v) => v !== val);
    formik.setFieldValue(name, updated);
    onChange?.(updated);
  };

  return (
    <div className="w-full">
      {label && (
        <Label className={`block mb-1 ${labelClassName}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Select
        selectionMode="multiple"
        placeholder={placeholder}
        variant={variant}
        isDisabled={disable}
        isInvalid={touched && !!error} 
        className="rounded-lg border border-grey-600 bg-surface transition-all w-full"
      >
        <Select.Trigger className="flex flex-wrap gap-1 min-h-[38px] py-1 px-2">
          <Select.Value
            render={() => (
              <div className="flex flex-wrap gap-1">
                {selectedValues.length > 0 ? (
                  selectedValues.map((val) => {
                    const option = options.find((o) => o.value === val);

                    return (
                      <Chip
                        key={val}
                        size="sm"
                        className="bg-primary/20 text-black flex items-center gap-1"
                      >
                        <div className="flex items-center gap-1">
                          {option?.label || val}

                          <button
                            type="button"
                            onClick={() => handleRemove(val)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </Chip>
                    );
                  })
                ) : (
                  <span className="text-gray-400">{placeholder}</span>
                )}
              </div>
            )}
          />
        </Select.Trigger>

        <Select.Indicator />

        <Select.Popover>
          <ListBox
            selectionMode="multiple"
            selectedKeys={new Set(selectedValues)}
            onSelectionChange={handleSelectionChange}
          >
            {options.map((option) => (
              <ListBox.Item
                key={option.value}
                id={option.value}
                textValue={option.label}
                isDisabled={option.disabled}
              >
                {option.label}
              </ListBox.Item>
            ))}
          </ListBox>
        </Select.Popover>
      </Select>

      <FieldError>{touched ? error : ""}</FieldError>
    </div>
  );
};

export default MultiSelect;
