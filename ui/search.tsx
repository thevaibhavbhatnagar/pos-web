"use client";

import React, { memo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SearchField, Label } from "@heroui/react";
import { SearchIcon } from "lucide-react";

type Props = {
  className?: string;
};

const Search: React.FC<Props> = ({
  className = "w-full max-w-full md:max-w-[44%] lg:max-w-[24%]",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filterValue, setFilterValue] = useState(
    searchParams.get("search") || ""
  );

  const handleChange = (value: string) => {
    setFilterValue(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("search", value);
    else params.delete("search");

    router.replace(`?${params.toString()}`);
  };

  return (
    <SearchField
      className={className}
      value={filterValue}
      onChange={handleChange}
      variant="primary"
    >
      {/* optional label */}
      <Label>Search</Label>

      <SearchField.Group>
        <SearchField.SearchIcon>
          <SearchIcon size={16} className="text-default-400" />
        </SearchField.SearchIcon>

        <SearchField.Input placeholder="Search by name..." />

        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
};

export default memo(Search);