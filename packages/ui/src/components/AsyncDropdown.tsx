"use client"

import { Select, SelectProps } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";

export interface DataItem {
  value: string ;
  label: string;
}

interface Props extends SelectProps {
  fetcher: () => void;
  dataItem?: DataItem[];
  isLoading?: boolean;
}

export const AsyncDropdown = ({
  fetcher,
  dataItem,
  isLoading,
  ...rest
}: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

  useEffect(() => {
    fetcher();
  }, [debouncedSearchTerm]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && !isLoading) {
      fetcher();
    }
  };

  return (
    <Select
      searchable
      onSearchChange={setSearchTerm}
      data={dataItem}
      onScroll={handleScroll}
      {...rest}
    />
  );
};
