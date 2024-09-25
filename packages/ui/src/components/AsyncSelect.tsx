import { ComboboxItem, Select, SelectProps } from "@mantine/core";
import {
  DebouncedParams,
  useDebouncedSearch,
} from "../hooks/useDebouncedSearch";

export type AsyncSelectProps = DebouncedParams<ComboboxItem> &
  Omit<SelectProps, "data" | "searchable" | "onSearchChange">;

export const AsyncSelect = ({
  fetcher,
  debounceTime = 400,
  value,
  initialData,
  ...rest
}: AsyncSelectProps) => {
  const [searchedData, search] = useDebouncedSearch<ComboboxItem>(
    fetcher,
    debounceTime,
    initialData
  );

  return (
    <Select
      data={searchedData || []}
      value={value}
      searchable
      onSearchChange={search}
      {...rest}
    />
  );
};
