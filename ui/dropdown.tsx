import React from "react";
import { Dropdown, Button, Label } from "@heroui/react";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  selectLabel: string;
  options: Option[];
  selected: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  selectionMode?: "single" | "multiple";
  className?: string;
};

export const Select: React.FC<Props> = ({
  selectLabel,
  options,
  selected,
  onSelectionChange,
  selectionMode = "multiple",
  className,
}) => {
  return (
    <Dropdown>
      <Button className={className || "hidden sm:flex"} variant="secondary">
        <span>{selectLabel}</span>
        <ChevronDown size={16} />
      </Button>

      <Dropdown.Popover placement="bottom end">
        <Dropdown.Menu
          aria-label={selectLabel}
          selectionMode={selectionMode}
          selectedKeys={selected}
          disallowEmptySelection
          onSelectionChange={(keys) =>
            onSelectionChange(new Set(Array.from(keys) as string[]))
          }
        >
          {options.map((option) => (
            <Dropdown.Item
              key={option.value}
              id={option.value}
              textValue={option.label}
              className="capitalize"
            >
              <Label>{option.label}</Label>
              {selectionMode === "multiple" && <Dropdown.ItemIndicator />}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
